import React, {  useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

import NFCwait from "../../Components/NFCwait/NFCwait.tsx";
import NFCok from "../../Components/NCFok/NFCok.tsx";

// Pre-step, call this before any NFC operations
NfcManager.start();


//@ts-ignore
function NFCPage({ navigation }) {
  const [loading, setLoading] = useState(true);

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn('Tag found', tag);
      setLoading(false);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.wrapper}>
        {
          loading ? <NFCwait/> : <NFCok />
        }
      <TouchableOpacity onPress={readNdef}>
        {
          loading ? <Text style={{fontSize:24,textAlign:"center"}}>Kartınızı telefonun arka kısmına yaklaştırıp bekleyiniz......</Text> : <Text style={{fontSize:24,textAlign:"center"}}>
            NFC okuma başarılı sisteme yönlendiriliyorsunuz...
          </Text>
        }

      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=> {
          setLoading(false);
          setTimeout(() => navigation.navigate("app"), 3000);
        }}>
        <Text style={{color:"transparent"}}>Press to Login System</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NFCPage;
