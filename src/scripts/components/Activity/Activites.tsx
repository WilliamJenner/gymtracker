import { StorageKeys } from "@constants/StorageKeys";
import { Activity } from "@customTypes/";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Button, ScrollView, View } from "react-native";

const Activites = () => {
  const { getDataWithId: getData, saveData } = useFirebaseFirestore<Activity>({
    collectionKey: StorageKeys.Activites,
  });

  const { navigate } = useNavigation();

  return (
    <ScrollView>
      <View>
        <Button title="Clear storage" onPress={() => {}} />

        <View></View>
      </View>
    </ScrollView>
  );
};

export default Activites;
