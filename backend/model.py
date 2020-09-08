import pandas as pd
import pickle

import nltk
from nltk.corpus import stopwords
#from nltk.tokenize import word_tokenize 
#from nltk.stem.porter import *
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.linear_model import LogisticRegression
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')

df3 = pd.read_csv('UScomments_textBlob.csv')

#Adding sentiment column
df3['sentiment']=0
df3.loc[df3.polarity>0, "sentiment"] = 1
df3.loc[df3.polarity==0, "sentiment"] = 0
df3.loc[df3.polarity<0, "sentiment"] = -1

#LowerCase the Comments
df3['comment_text'] = df3['comment_text'].str.lower()

#strip comments
df3['comment_text'] = df3['comment_text'].str.strip()

#removing stop words
stop = stopwords.words('english')
df3['stop_comments'] = df3['comment_text'].apply(lambda x: [item for item in str(x).split() if item not in stop])
tokenized_comments = df3['stop_comments']

#stemming
stemmer = PorterStemmer()
tokenized_comments = tokenized_comments.apply(lambda x: [stemmer.stem(i) for i in x])

#lemmatization
lemmatizer = WordNetLemmatizer()
tokenized_comments = tokenized_comments.apply(lambda x: [lemmatizer.lemmatize(i) for i in x])

for i in range(len(tokenized_comments)):
    tokenized_comments[i] = ' '.join(tokenized_comments[i])
df3['stop_comments'] = tokenized_comments

#Splitting the dataset
X_train,X_test,y_train,y_test = train_test_split(df3['stop_comments'],df3['sentiment'],test_size = 0.2,random_state = 324)

vect = CountVectorizer()
tf_train = vect.fit_transform(X_train)
tf_test = vect.transform(X_test)

lr = LogisticRegression()
lr.fit(tf_train,y_train)

pickle.dump(lr, open('model.pkl','wb'))
model = pickle.load(open('model.pkl','rb'))

pickle.dump(vect, open('vect.pkl','wb'))
vect = pickle.load(open('vect.pkl','rb'))