import * as Font from 'expo-font';

export default FontLoader = () => {

     const [loaded] = useFonts({
        'openSansBold': require('./OpenSans-Bold.ttf'),
    })

    return loaded? loaded : null;
}