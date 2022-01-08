#imports
from bs4 import BeautifulSoup as bs
import pandas as pd
from splinter import Browser
from webdriver_manager.chrome import ChromeDriverManager

#dictionary for storing info to return from function
plant_data = {}

#defining function
def scrape():
    
    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=False)

    url = 'https://www.houseplantsexpert.com/a-z-list-of-house-plants.html'
    browser.visit(url)

    html = browser.html
    soup = bs(html, "html.parser")  


    #click through each "page"
    #do for all 3 sections

    #click each plant name (list tag)
    browser.links.find_by_partial_text(x).click()

        #facts table
        # news_title = soup.find('div', class_='content_title').text
        plant_name = soup.find('').text
        
        #photo url

    browser.quit()
