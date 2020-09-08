import pickle
from sklearn.feature_extraction.text import CountVectorizer

vect = CountVectorizer()

pickle.dump(vect, open('vect.pkl','wb'))
model = pickle.load(open('vect.pkl','rb'))