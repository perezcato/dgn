/**
 * @Description: Style Bookmark screen
 * @Created by ZiniTeam
 * @Date create: 16/11/2018
 */
import { Device } from '../../config';
import { Colors } from '~/utils/colors';

export default {
  container: { flex: 1, backgroundColor: Colors.cloBackgroundOfApp },
  container_content_1: { paddingTop: 15 },
  container_content_2: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container_clear_all: {},

  txt_clear_all: { color: 'black', fontSize: Device.fS(13), fontFamily: Device.fontSlabRegular, textAlign: 'right' }

}