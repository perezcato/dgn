/**
 * @Description: Style of Intro screen
 * @Created by ZiniTeam
 * @Date create: 06/11/2018
 */
import { Device } from '../../config';
import { commonStyles } from '~/utils/styles';

export default introStyle = {
  /* Container */
  container: [commonStyles.full_center],
  img_bg: { width: '100%', height: '100%' },

  /* Logo */
  img_logo: { width: Device.w_scale('52.26%'), height: Device.h_scale('15.89%') },

  /* Slider */
  sld_intro: [commonStyles.column_justify_start, commonStyles.column_align_center,{ 
    width: '100%', height: Device.h_scale('1.5%'), position: 'absolute', bottom: '15%',left: 0
  }]
}