const num1 = '+79199966799';
const num2 = '+7(919)9966996';
const num3 = '+7(919) 996-69-99';
const num4 = ' +7(919) 996-69-99 ';
const num5err = ' +7(919) 996-o9-99';
const num6err = ' +8(919)i996-69-99';


function isPhoneNumber(num){
    num = num.trim();
    num = num.replace('+7', '8');
    if (!num.startWith('8') ){
        return false;
    }

    }