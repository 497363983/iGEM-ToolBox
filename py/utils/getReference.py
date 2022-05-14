class references:
    doiArray = [2,1,3]
    references = []
    cache_file = ''
    def __init__(self,doiArray:list):
        self.doiArray = list(set(self.doiArray + doiArray))
    
    # def refreshReferences(self):

    # def getReferenceInformation(self):


if __name__ == "__main__":
    print(references([1,2,3]).doiArray)
