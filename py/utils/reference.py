#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import requests

class references:                                               
    doi = ''
    references = []
    cache_file = ''
    base_url = "http://api.crossref.org/"
    json_url = "{}works/{}"
    bib_url = "{}works/{}/transform/application/x-bibtex"
    bib = ""
    json = {}

    def __init__(self,doi:str):
        self.doi = doi
    
    def getInformationByDOIToJSON(self):
        url = self.json_url.format(self.base_url,self.doi)
        r = requests.get(url)
        found = False if r.status_code != 200 else True
        item = r.json()
        print(item)

    def getInformationByDOIToBib(self):
        url = self.bib_url.format(self.base_url,self.doi)
        r = requests.get(url)
        found = False if r.status_code != 200 else True
        bib = r.content
        bib = str(bib, "utf-8")
        print(bib)

    # def getExistReference(self):




    
    # def refreshReferences(self):

    # def getReferenceInformation(self):


# if __name__ == "__main__":
#     # print(references([1,2,3]).doiArray)
#     references("10.1186/s13045-020-00910-5").getInformationByDOIToBib()
