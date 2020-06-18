/**
 * @Description: Style Post screen
 * @Created by ZiniTeam
 * @Date create: 11/01/2019
 */
import { Platform } from 'react-native';
import { Device } from '~/config';

const STATUS_BAR_OFFSET = (Platform.OS === 'android' ? 25 : 0);

export default {
    container: { position: 'relative' },
    mask: { width: Device.width, height: Device.height, position: 'absolute', top: 0, left: 0, zIndex: 1},

    header: { width: Device.width, height: Device.h_scale('7%'), flexDirection: 'row', paddingHorizontal: 15, marginTop: STATUS_BAR_OFFSET, justifyContent: 'flex-end', alignItems: 'center', position: 'relative'  },
    positionItem: { position: 'absolute', width: Device.width, height: Device.h_scale('7%'),top: 0, left: 0, alignItems: 'center', justifyContent: 'center', },
    right_header: { flexDirection: 'row' },
    itemRight: { marginLeft: Device.w_scale('6%') },
    txtCount: { color: 'white', fontSize: Device.fS(16), fontFamily: Device.fontSlabBold },
    infoImage:  { width: Device.width, height: Device.height, position: 'absolute', top: 0, left: 0, zIndex: 3, justifyContent: 'space-between' },
    description: { width: '100%', paddingHorizontal: 15, marginBottom: 10  },
    txtDescription: { color: 'white', fontFamily: Device.fontSlabRegular, fontSize: Device.fS(12), marginBottom: 10 },
    txtSeeMore: { color: 'white', fontFamily: Device.fontSlabBold, fontSize: Device.fS(14) },
}