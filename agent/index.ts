import { log } from './logger';



function hookFunc() {

    //const dumpOffset = 0x0000000000009990 + 0x1ebb5c // _kDartIsolateSnapshotInstructions + code offset
    const dumpOffset = 0x3558c8 // fileoffset from hopper
    
    let argBufferSize = 150

    let address = Module.findBaseAddress('App') // libapp.so (Android) or App (IOS)
    log('\n\nbaseAddress: ' + address!!.toString())
    log('dumpOffset: 0x' + dumpOffset.toString(16))
    let codeOffset = address!!.add(dumpOffset)
    log('codeOffset: ' + codeOffset.toString())
    log('')
    log('Wait..... ')

    Interceptor.attach(codeOffset, {
        onEnter: function(args) {

            console.log('')
            console.log('--------------------------------------------|')
            console.log('\n    Hook Function: ' + dumpOffset);
            console.log('')
            console.log('--------------------------------------------|')
            console.log('')
            
            for (let argStep = 0; argStep < 50; argStep++) {
                try {
                    dumpArgs(argStep, args[argStep], argBufferSize);
                } catch (e) {

                    break;
                }

            }
            
        },
        onLeave: function(retval) {
            console.log('RETURN : ' + retval)
            dumpArgs(0, retval, 150);
        }
    });

}


function dumpArgs(step: number, address: NativePointer, bufSize: number) {
    const buf = address.readByteArray(bufSize)
    //console.log(address.readCString(bufSize))

    console.log(buf!!.slice(15, 50))
    //console.log(buf!!.slice(1, 1))

    /*
    console.log('Argument ' + step + ' address ' + address.toString() + ' ' + 'buffer: ' + bufSize.toString() + '\n\n Value:\n' +hexdump(buf!!, {
        offset: 0,
        length: bufSize,
        header: false,
        ansi: false
    }));
    */

    console.log('')
    console.log('----------------------------------------------------')
    console.log('')
}

setTimeout(hookFunc, 1000)