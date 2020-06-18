/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/* LIBRARY */
import React from 'react';
import { View } from 'react-native';
import {
  Container, Content, Form, Item, Label,
  Input, Button, Spinner,
} from "native-base";
/* COMPONENTS */
import CText from '~/components/CText';
/* COMMON */
import { Device, Config, Languages } from '~/config';
import { Colors } from '~/utils/colors';
/* STYLES */
import styles from './style'
import CHeader from '~/components/CHeader';

const inputFields = {
  hostUrl: "hostUrl",
}
export const ViewLinkDemo = ({
  state = null,
  props = null,
  inputs = {},
  onFunction = {
    onPressBack: () => { },
    onFocusNextField: () => { },
    onPressLinkDemo: () => { },
  }
}) => {
  return (
    <Container>
      <CHeader title={Languages[Config.lang].LINK_DEMO} hasBtnBack={true} />
      <Content>
        <Form style={[styles.con_form, { paddingHorizontal: Config.layout_offset.left }]}>
          {/** HOST URL INPUT */}
          <Item style={[styles.con_input, { flex: 1, marginLeft: 0 }]} floatingLabel error={state._errorHostUrl !== ""} >
            <Label style={styles.con_label}><CText style={styles.txt_label} i18nKey={'HOST_URL'} /></Label>
            <Input style={styles.txt_input}
              getRef={ref => inputs[inputFields.hostUrl] = ref}
              disabled={state._loading}
              removeClippedSubviews={Device.OS === 'android'}
              placeholderTextColor={Colors.PLACEHOLDER_COLOR}
              blurOnSubmit={false}
              autoFocus={true}
              returnKeyType={'done'}
              selectionColor={Colors.BLACK_COLOR}
            />
          </Item>
          {state._errorHostUrl !== "" && <CText style={styles.txt_error} i18nKey={state._errorHostUrl} />}

          <Button block style={[styles.con_btn, { backgroundColor: Colors.cloBMActive }]} iconLeft onPress={onFunction.onPressLinkDemo} disabled={state._loading} >
            {state._loading && <Spinner style={styles.spi_loading} color={Colors.WHITE_COLOR} size={'small'} />}
            <CText style={styles.txt_btn} i18nKey={'CHANGE'} upperCase />
          </Button>
        </Form>

      </Content>
    </Container >
  )
}