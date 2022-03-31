from selenium import webdriver
from selenium.webdriver.common.by import By
import time
'''
    在观看多part视频时, 有时需要检索自己想看的某一part, 利用脚本读出来,便于自己检索.
'''
class VideoPartsNameGet:
    def __init__(self, url):
        self.url = url
        self.wd = webdriver.Chrome("F:\\ChromeGo\\ChromeGo\\Browser\\chromedriver.exe")
        self.data=[]
        self.title = ''  #文件名

    # 执行函数
    def run(self):
        self.wd.get(self.url)
        time.sleep(5)
        print('正在读取...')
        self.getData()
        self.saveData()
        print('读取成功!')

    # 获取标题函数
    def getData(self):
        title = self.wd.find_element(By.CSS_SELECTOR, 'html .tit')
        self.title = str(title.text)
        self.data.append(title.text)

        elements = self.wd.find_elements(By.CSS_SELECTOR,'.list-box a')

        for i in elements:
            self.data.append(i.text)
    # 保存数据内容
    def saveData(self):
        filename = self.title + ".txt"
        with open(filename, 'a') as f:
            for i in self.data:
                i = i.replace('\n', ' ')
                print(i)
                f.write( i + '\n')
    def close_browser(self):
        self.wd.quit()
if __name__ == '__main__':
    # url = 'https://www.bilibili.com/video/BV1Sy4y1C7ha?p=211'
    url = input("请输入bv号:")
    url = 'https://www.bilibili.com/video/{}'.format(url)
    videoname = VideoPartsNameGet(url)
    videoname.run()
    videoname.close_browser()


