import requests
import re
from bs4 import BeautifulSoup

regex = re.compile(
                    r'^(?:http|ftp)s?://' # http:// or https://
                    r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
                    r'localhost|' #localhost...
                    r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
                    r'(?::\d+)?' # optional port
                    r'(?:/?|[/?]\S+)$', re.IGNORECASE)

def main():
    number = '1'
    while  number == '1' or number == '2':
        try:
            print('Other: Exit')
            print('1-Exercise 1: Get urls')
            print('2-Exercise 2: Get urls and nodes')
            print('***********************************')
            number = input()
            if number == '1':
                URL = input('Enter url:_')
                for url in BasicUrl(URL):
                    print("--- " + url)
            elif number == '2':
                URL = input('Enter url:_')
                urls = BasicUrl( URL )
                nodeCount = input('Enter number of nodes:_')
                nodeCount = int(nodeCount.strip())
                finalUrls = []

                for i in range(0, len(urls)):
                    print('--- ' + urls[i] + '\n')
                    arbol(urls[i], nodeCount, nodeCount)
                    print('\n')
        except(RuntimeError, TypeError, NameError):
            print(TypeError)

def BasicUrl(URL):
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, 'html.parser')
    paths = soup.findAll(href=True)
    found = []
               
    for path in paths:
        if re.match(regex,path['href']):
            found.append(path['href'])
            
    return found

def arbol( url, nodeCount, numNodesOriginal ):
    urls = BasicUrl( url )
    finalUrls = []
    nodeCount = nodeCount - 1

    if nodeCount > 0 :
        if len(urls) > 0:
            for i in range(0, len(urls)):
                print(('\t' * (numNodesOriginal - nodeCount)) + '--- ' + urls[i] + '\n')
                arbol(urls[i], nodeCount, numNodesOriginal)
    else:
        finalUrls = urls
        for i in range(0, len(urls)):
            print(('\t' * (numNodesOriginal - nodeCount)) + '--- ' + urls[i] + '\n')

main()
