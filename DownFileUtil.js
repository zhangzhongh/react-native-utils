import RNFS from 'react-native-fs'
import {
    Platform,
    PermissionsAndroid
} from 'react-native'
import {show} from '../utils/Utils'
import {getString} from "../base/constants/I18n";

const saveDir = (Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalStorageDirectoryPath) + '/pgrab/file'

const isAndroidGranted = () => {
    if (Platform.OS === 'ios') {
        return true
    } else {
        return PermissionsAndroid
                    .check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
                    .then(isGranted => isGranted )
                    .catch(error=> false)
    }
}

const mkdirDir = (dir) => {
    return RNFS.exists(dir)
        .then((isExist)=>{
            if (!isExist) {
                return RNFS.mkdir(dir)
                    .then((data)=> true)
                    .catch((error)=> false)
            } else {
                return true
            }
        })
        .catch((error)=> false)
}

export const downFile = async (url,fileName,curLanguageIndex) => {

    const isGranted = await isAndroidGranted()
    if (!isGranted) {
        show(getString('readWritePermission',curLanguageIndex))
        return false;
    }

    const createDirResult = await mkdirDir(saveDir)
    if (!createDirResult) {
        show(getString('mkdirDirFileError',curLanguageIndex))
        return false;
    }

    const downRes = RNFS.downloadFile({
        fromUrl: url,
        toFile: saveDir + "/" + fileName,
        begin: (res) => {
            show(getString('downloadingTip',curLanguageIndex))
        },
        background: true,
        connectionTimeout: 10000,
        readTimeout: 10000
    })

    const downResult = downRes.promise
        .then(()=> ({
            result: true,
            path: saveDir + "/" + fileName
        })).catch(()=>{
            return {
                result: false
            }
        })

    return downResult

}