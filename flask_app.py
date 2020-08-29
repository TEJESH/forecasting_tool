# -*- coding: utf-8 -*-
# A very simple Flask Hello World app for you to get started with...
from flask import Flask, render_template, request
import xlrd, pandas,os,sqlite3,json
from collections import defaultdict
import numpy as np
from flask import request


app = Flask(__name__)
pandas.option_context('display.max_rows', None, 'display.max_columns', None)
DATABASE = 'ghi.db'
mapping = {2:"tb", 3:"malaria", 4:"hiv", 5:"roundworm", 6:"hookworm", 7:"whipworm", 8:"Schistomasis", 9:"onchoceriasis", 10:"if"}
# added 8:"Schistomasis" in map
# Updated on :July 01,2020
# Updated by : Kasturi Vartak
app.config.from_object(__name__)
def connect_db():
    dirname = os.path.dirname(__file__)
    filename = os.path.join(dirname, 'ghi.db')
    connection = sqlite3.connect(filename)
    return connection

# print conn.execute("select region from country2015").fetchall()

@app.route('/get_regions')
def getRegions():
    conn = connect_db()
    countries_obj = conn.execute("select region from country2015").fetchall()
    countries_obj.append('All Countries')
    return (countries_obj)

@app.route('/get_years')
def getYears():
    years = [2010,2013,2015]
    return (years)

@app.route('/get_countries_by_region')
def get_countries_by_region():
    conn = connect_db()
    region = request.args.get("selected_region")
    if(region == 'All Countries'):
        return getAllCountries()
    else:
        return (conn.execute("select country from country2015 where region ='"+str(region)+"'").fetchall())


#only consider below 4 functions for tommorrow's demo
#country -> disease -> drug -> company


@app.route('/country', methods = ['GET' , 'POST'])
def getAllCountries():
    conn = connect_db()
    countries_obj = conn.execute("select country from country2015").fetchall()
    list_of_countries =  [i[0] for i in countries_obj]
    return json.dumps(list_of_countries)

@app.route('/get_disease', methods = ['GET','POST'])
def getDiseaseFromCountry():
    country_select = request.get_json()["selected_country"]
    string_country_select = str(country_select)
    # print country_select
    conn = connect_db()
    disease = []
    # countries_obj = conn.execute("select * from country2015 where country = " + "' " + str(country_select) +"'").fetchall()
    countries_obj = conn.execute("select * from country2015 where country = " + "\" " + str(country_select) +"\"").fetchall()
    # changes the query to add escape character in the middle like this  "\" "
    # Updated on :July 07,2020
    # Updated by : Kasturi Vartak
    if(len(countries_obj) >0 ):
        for idx, val in enumerate(countries_obj[0][2:]):
            if(val > 0):
                disease.append(mapping[idx+2])
        return json.dumps(disease)
    return "No data found"
    # return json.dumps("No diseases found")

@app.route('/get_company', methods = ['GET','POST'])
def getCompanyByDrug():
    drug = request.get_json()["selected_drug"]
    conn = connect_db()
    company_obj = conn.execute("select company from drug2015 where drug ='"+drug+"'").fetchall()
    # companies_obj = [i[0] for i in company_obj]
    # added a for loop to filter so that only 1 company will populate
    # Updated on :July 07,2020
    # Updated by : Kasturi Vartak
    companies_obj = []
    for j in company_obj:
        if(j not in companies_obj):
            companies_obj.append(j)
    return json.dumps(companies_obj)

@app.route('/get_drug', methods = ['GET','POST'])
def getDrugByDisease():
    selected_disease = request.get_json()["selected_disease"]
    # selected_country = request.get_json()["selected_disease"]
    conn = connect_db()
    drug_obj = conn.execute("select drug from drug2015 where disease ='"+selected_disease+"' COLLATE NOCASE").fetchall()
    # drugs_obj = [i[0] for i in drug_obj]
    # added a for loop to filter so that only 1 drug will populate
    # Updated on :July 07,2020
    # Updated by : Kasturi Vartak
    drugs_obj=[]
    for j in drug_obj:
        if(j not in drugs_obj):
            drugs_obj.append(j)
    # getCompanyByDrug(drug_obj[0][0])

    return json.dumps(drugs_obj)


# print getDiseaseFromCountry(" Albania")
# print getDrugByDisease('TB')
# print getCompanyByDrug("Lamivudine (3TC)")


# drug->country->disease->Company
def getAllDrugs():
    conn = connect_db()
    obj = conn.execute("select drug from drug2015").fetchall()
    return obj

def getCountrybyDrug(drug):
    conn = connect_db()
    obj = conn.execute("select country from drugimpact2015 where drug > 0").fetchall()
    return obj

def getDiseaseByCountry(country):
    conn = connect_db()
    countries = []
    obj = conn.execute("select * from country2015 where country ="+country).fetchall()
    for idx, val in enumerate(obj[0][2:]):
        if(val > 0):
            countries.append(mapping[idx+2])
    return countries
#can use the above company by disease for next function


#disease -> country -> drug-> company
def getAllDisease():
    obj = conn.execute("select disease from disease2015").fetchall()
    return obj

def getCompanybyDisease(disease):
    obj = conn.execute("select disease, company from manudis2015").fetchall()
    d = {}
    for key, value in obj:
        if key not in d:
            d[key] = []
        d[key].append(value)
    return d[disease]

def getCountrybyDrug(drug):
    conn = connect_db()
    obj = conn.execute("select country from drugimpact2015 where drug > 0").fetchall()
    return obj

def getCountrybyDisease(disease):
    obj = conn.execute("select country from countrybydis2010 where "+ disease +"> 0").fetchall()
    return obj




# company -> Country -> disease -> drug
def getAllCompanies():
    conn = connect_db()
    obj = conn.execute("select manufacturer from manufacturer").fetchall()
    return obj

#can use the getCountrybyDisease function from the first sequence

def getCountryByCompany(selected_company):
    conn = connect_db()
    #get drug by company
    drug_obj =  conn.execute("select drug from drug2015 where company='"+selected_company+"'").fetchall()
    # for each_drug in drug_obj:
    #     #will need harshal's table here
    # return obj
    return drug_obj

def getDrugByCountry(selected_country):
    conn = connect_db()
    obj = conn.execute("select distype from distypes where country = '"+selected_country+"'").fetchall()
    return obj

def getDrugbyCompany():
    conn = connect_db()

# @app.teardown_appcontext
# def close_connection(exception):
#     db = getattr(g, '_database', None)

# @app.errorhandler(500)
# def internal_error_500(e):
#     return render_template('error500.html',showindex=1, navsub=1), 500

if __name__ == '__main__':
    app.run(debug=True)
