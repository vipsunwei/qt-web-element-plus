import pyttsx3


def tts(*args):
    
    engine = pyttsx3.init()

    """Rate"""
    rate = engine.getProperty('rate')
    print(rate)
    #engine.setProperty('rate',125)


    """VOLUME"""
    volume = engine.getProperty('volume')
    print(volume)
    #engine.setProperty('volume',1.0)


    """VOICE"""
    voices = engine.getProperty('voices')
    #engine.setProperty('voice',voices[1].id)

    words = args[0]
    mp3name = words + '.mp3'
    #engine.say(words)
    #engine.runAndWait()
    #engine.stop()
    engine.save_to_file(words,mp3name)
    engine.runAndWait()
    engine.stop()
if __name__ == '__main__':

    #words = input("input words to speak: ")
    f = open('test.txt','r')
    words = f.readlines()
    f.close()
    #print(words)
    for word in words:
        word = word.strip()
        print(word)
        tts(word)
    #tts(words)