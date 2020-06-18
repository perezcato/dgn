/**
 * @Description: Style hashtag of all Screens
 * @Created by ZiniTeam
 * @Date create: 09/01/2019
 */
import { Device } from '../../config';
import { Colors } from '~/utils/colors';

export default hashtagitemStyle = {
  container_hashtag_item: { height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.cloHeader, borderRadius: 5, marginRight: 10 },
  txt_hashtag_item: { color: 'black', fontSize: Device.fS(13), fontFamily: Device.fontSlabRegular, paddingHorizontal: 10 }
}