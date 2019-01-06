import sys
import string
import re
import io
import csv
from flask import Flask, render_template, request, redirect, Response, jsonify
import random, json
import pickle
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

lines = []


def seperateComment(comment):
    global lines

    lines.clear()

    i = 0
    for index in comment:
        
        p = re.sub(r'","','', index)


        if(i==0):
            p = re.sub(r'["["]','', p)

        if(i != len(comment)-1):
            p = re.sub(r'\\n', ' ', p)
            p = re.sub(r'\s+', ' ', p)
            p = re.sub(r'\\"','"', p )
            p = re.sub(r'\\r ',' ', p )
            #p = re.sub(r'\\t', ' ', p)
            p.lstrip()
            p.rstrip()
            p.strip()
            lines.append(p)
        
        i = i+1
    
        

    #print(str(lines))

def deleteFile():
    file = open("/SATD/Pluginchrome/templates/ParsedComment.txt","w+")
    file.truncate()
    
    file.close()

def saveComment():
    file = open("/SATD/Pluginchrome/templates/ParsedComment.txt","w")
    global lines
    #print(lines)
    for line in lines:
        file.write(str(line)+ "\n")
    
    file.close()

def extract_comment(filename):
    text = open(filename,"r")
    code = text.read()
    line = code.split("\n")
    i = 0
    collection =list()
    tag = 0
    temp_keeper = list()
    comment_continue = ""
    
    while i < len(line):
        
        original = line[i].strip()
        line_entire_content = line[i]
        line_entire_content = re.sub(r'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)',' abstracturl',line_entire_content)
        line_entire_content = re.sub(r'www\.?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)',' abstracturl',line_entire_content)
        line_entire_content = re.sub(r'\s+', ' ', line_entire_content)
        j = 0
        line_entire_content = line_entire_content.strip()
        combination = list()

        while j < len(line_entire_content):
            if(tag == 0):
                if(j+1 != len(line_entire_content) and line_entire_content[j] == "/" and line_entire_content[j+1] == "/"):
                    combination.append(i)
                    combination.append(j)
                    state_comment = j
                    comment = ""
                    while state_comment < len(original):
                        comment +=  original[state_comment]
                        state_comment += 1
                    combination.append(i)
                    combination.append(comment)
                    collection.append(combination)
                    break
                if(j+1 != len(line_entire_content) and line_entire_content[j] == "/" and line_entire_content[j+1] == "*"):
                    combination.append(i)
                    combination.append(j)
                    if(line_entire_content[-2] == "*" and line_entire_content[-1] == "/"):
                        combination.append(i)
                        start = j
                        comment = ""
                        while start < len(original):
                            comment += original[start]
                            start += 1
                        combination.append(comment)
                        collection.append(combination)
                    else:
                        temp_keeper.append(i)
                        temp_keeper.append(j)
                        tag = 1
                        start = j
                        while start < len(original):
                            comment_continue += original[start]
                            start += 1
                        break
            else:
                if(len(line_entire_content) >= 2 and line_entire_content[-2] == "*" and line_entire_content[-1] == "/"):
                    temp_keeper.append(i)
                    start = 0
                    while start < len(original):
                        comment_continue += original[start]
                        start += 1
                    combination.append(temp_keeper[0])
                    combination.append(temp_keeper[1])
                    combination.append(temp_keeper[2])
                    combination.append(comment_continue)
                    collection.append(combination)
                    temp_keeper.clear()
                    comment_continue = ""
                    tag = 0
                    break
                else:
                    start = 0
                    while start < len(original):
                        comment_continue += original[start]
                        start += 1
                    break
            j += 1
        i += 1
    return collection

def convertor(string_input):
    file = open("filtered_Ngram.txt","r")
    string = string_input
    text = file.read()
    term = text.split("\n")
    BagOfWord = dict()
    count = 0
    
    for run in term:
        if(run == ""):
            break
        each = tuple(run.strip().split(' '))
        BagOfWord[each] = count
        count += 1

    temp = string.split(' ')
    vector = [0] * len(BagOfWord)
    for i in range(len(temp)):
        for j in range(i,min(i+11,len(temp))):
            if(tuple(temp[i:j+1]) in BagOfWord):
                vector[BagOfWord[tuple(temp[i:j+1])]] += 1
    return vector

def pattern_detection_62(string_input):
    p = re.sub(r'hack', ' pattern ', string_input)
    p = re.sub(r'ugly', ' pattern ', p)
    p = re.sub(r'nuke', ' pattern ', p)
    p = re.sub(r'barf', ' pattern ', p)
    p = re.sub(r'yuck', ' pattern ', p)
    p = re.sub(r'crap', ' pattern ', p)
    p = re.sub(r'hacky', ' pattern ', p)
    p = re.sub(r'silly', ' pattern ', p)
    p = re.sub(r'fixme', ' pattern ', p)
    p = re.sub(r'stupid', ' pattern ', p)
    p = re.sub(r'kludge', ' pattern ', p)
    p = re.sub(r'kaboom', ' pattern ', p)
    p = re.sub(r'give up', ' pattern ', p)
    p = re.sub(r'toss it', ' pattern ', p)
    p = re.sub(r'retarded', ' pattern ', p)
    p = re.sub(r'bail out', ' pattern ', p)
    p = re.sub(r'at a loss', ' pattern ', p)
    p = re.sub(r'take care', ' pattern ', p)
    p = re.sub(r'this is bs', ' pattern ', p)
    p = re.sub(r'causes issue', ' pattern ', p)
    p = re.sub(r'prolly a bug', ' pattern ', p)
    p = re.sub(r'this is wrong', ' pattern ', p)
    p = re.sub(r'fix this crap', ' pattern ', p)
    p = re.sub(r'inconsistency', ' pattern ', p)
    p = re.sub(r'is problematic', ' pattern ', p)
    p = re.sub(r'don\'t use this', ' pattern ', p)
    p = re.sub(r'probably a bug', ' pattern ', p)
    p = re.sub(r'this is uncool', ' pattern ', p)
    p = re.sub(r'trial and error', ' pattern ', p)
    p = re.sub(r'cause for issue', ' pattern ', p)
    p = re.sub(r'get rid of this', ' pattern ', p)
    p = re.sub(r'just abandon it', ' pattern ', p)
    p = re.sub(r'certainly buggy', ' pattern ', p)
    p = re.sub(r'remove this code', ' pattern ', p)
    p = re.sub(r'temporary crutch', ' pattern ', p)
    p = re.sub(r'some fatal error', ' pattern ', p)
    p = re.sub(r'abandon all hope', ' pattern ', p)
    p = re.sub(r'may cause problem', ' pattern ', p)
    p = re.sub(r'workaround for bug', ' pattern ', p)
    p = re.sub(r'temporary solution', ' pattern ', p)
    p = re.sub(r'this can be a mess', ' pattern ', p)
    p = re.sub(r'there is a problem', ' pattern ', p)
    p = re.sub(r'give up and go away', ' pattern ', p)
    p = re.sub(r'it doesn\'t work yet', ' pattern ', p)
    p = re.sub(r'this isn\'t very solid', ' pattern ', p)
    p = re.sub(r'something\'s gone wrong', ' pattern ', p)
    p = re.sub(r'this isn\'t quite right', ' pattern ', p)
    p = re.sub(r'is this next line safe', ' pattern ', p)
    p = re.sub(r'something bad happened', ' pattern ', p)
    p = re.sub(r'you can be unhappy now', ' pattern ', p)
    p = re.sub(r'hang our heads in shame', ' pattern ', p)
    p = re.sub(r'this doesn\'t look right', ' pattern ', p)
    p = re.sub(r'risk of this blowing up', ' pattern ', p)
    p = re.sub(r'is this line really safe', ' pattern ', p)
    p = re.sub(r'something bad is going on', ' pattern ', p)
    p = re.sub(r'hope everything will work', ' pattern ', p)
    p = re.sub(r'treat this as a soft error', ' pattern ', p)
    p = re.sub(r'something serious is wrong', ' pattern ', p)
    p = re.sub(r'doubt that this would work', ' pattern ', p)
    p = re.sub(r'remove me before production', ' pattern ', p)
    p = re.sub(r'this is temporary and will go away', ' pattern ', p)
    p = re.sub(r'unknown why we ever experience this', ' pattern ', p)
    p = re.sub(r'this indicates a more fundamental problem', ' pattern ', p)
    p = re.sub(r'do not use this', ' pattern ', p)
    p = re.sub(r'it does not work yet', ' pattern ', p)
    p = re.sub(r'this is not very solid', ' pattern ', p)
    p = re.sub(r'this is not quite right', ' pattern ', p)
    p = re.sub(r'this does not look right', ' pattern ', p)
    p = re.sub(r'todo', ' pattern ', p)
    p = re.sub(r'fixme', ' pattern ', p)
    p = re.sub(r'checking', ' pattern ', p)
    p = re.sub(r'\s+', ' ', p)

    if('pattern' in p):
        return 1
    else: return 0

def special_character_replacement(sentence):
    p = re.sub(r'\\n',' ',sentence)
    p = re.sub(r'[?]', ' questionMark ', p)
    p = re.sub(r'["]', ' quote0 ', p)
    p = re.sub(r'[`]', ' quote1 ', p)
    p = re.sub(r'[{]', ' quote2 ', p)
    p = re.sub(r'[}]', ' quote3 ', p)
    p = re.sub(r'[(]', ' quote4 ', p)
    p = re.sub(r'[)]', ' quote5 ', p)
    p = re.sub(r'[\']', ' quote6 ', p)
    p = re.sub(r'[,]', ' quote7 ', p)
    p = re.sub(r'[@]', ' quote8 ', p)
    p = re.sub(r'[:]', ' quote9 ', p)
    p = re.sub(r'[;]', ' quote10 ', p)
    p = re.sub(r'[<]', ' quote11 ', p)
    p = re.sub(r'[>]', ' quote12 ', p)
    p = re.sub(r'[!]', ' quote13 ', p)
    p = re.sub(r'[.]', ' quote14 ', p)
    p = re.sub(r'[-]', ' quote15 ', p)
    p = re.sub(r'[=]', ' quote16 ', p)
    p = re.sub(r'[_]', ' quote17 ', p)
    p = re.sub(r'[+]', ' quote18 ', p)
    p = re.sub(r'[/]', ' quote19 ', p)
    p = re.sub(r'[\[]', ' quote20 ', p)
    p = re.sub(r'[\]]', ' quote21 ', p)
    p = re.sub(r'[*]', ' quote22 ', p)
    p = re.sub(r'[|]', ' quote23 ', p)
    p = re.sub(r'[~]', ' quote24 ', p)
    p = re.sub(r'[\^]', ' quote25 ', p)
    p = re.sub(r'[\\]', ' quote26 ', p)
    p = re.sub(r'[$]', ' quote27 ', p)
    p = re.sub(r'[%]', ' quote28 ', p)
    p = re.sub(r'[#]', ' quote29 ', p)
    p = re.sub(r'[&]', ' quote30 ', p)
    p = re.sub(r'[^A-Za-z0-9]+',' ',p)
    p = re.sub(r'\s+', ' ', p)
    p = p.strip()
    return p

def prediction(comments):
    loaded_model = pickle.load(open('predictor.pkl', 'rb'))
    comment_list = comments
    i = 0
    while i < len(comment_list):
        temp = []
        identifier = comment_list[i]
        comment = special_character_replacement(identifier[3])
        vector = convertor(comment)
        detector_label = pattern_detection_62(identifier[3])
        vector.append(detector_label)
        temp.append(vector)
        result = loaded_model.predict(temp)
        comment_list[i].append(result[0])
        i += 1
    return comment_list

@app.route('/', methods = ['POST'])
def worker():
    # read json + reply
    data = request.values.get('input', '')

    if(data == "[]"):

        return "empty"


    else:
        comment = list(data.split('newlinecom'))
        seperateComment(comment)
        deleteFile()
        saveComment()
        comments = extract_comment("ParsedComment.txt")
        predictedcomments = prediction(comments)
        #print(predictedcomments)
    
 
        dicComment = dict()
        ins = 0
        sample = 0
        for index in predictedcomments:
            if index[4] == 1:
                dicComment[ins]= dict()
                dicComment[ins]["label"] = "design"
                dicComment[ins]["linestart"] = index[0] + 1
                dicComment[ins]["lineend"] = index[2] + 1
                dicComment[ins]["comment"] = index[3]
                ins = ins + 1
    
              
            if index[4] == 2: 
                dicComment[ins]= dict()
                dicComment[ins]["label"] = "req"
                dicComment[ins]["linestart"] = index[0] + 1
                dicComment[ins]["lineend"] = index[2] + 1
                dicComment[ins]["comment"] = index[3]
                ins = ins + 1

            if sample ==1:
                dicComment[ins]= dict()
                dicComment[ins]["label"] = "req"
                dicComment[ins]["linestart"] = index[0] + 1
                dicComment[ins]["lineend"] = index[2] + 1
                dicComment[ins]["comment"] = index[3]
                ins = ins + 1
            sample = sample +1
                
        print(dicComment)
    
    return  jsonify(dicComment)

if __name__ == '__main__':
    # run!
    app.run()