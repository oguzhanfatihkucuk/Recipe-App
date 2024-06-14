import React, { useEffect, useState } from "react";

import { FlatList} from "react-native";
import UserInformationCard from "../../../Components/UserInformation/UserInformationCard.tsx";
import { fetchMockBackendUserData } from "../../../../services/fetchingData/fetchData";
import LoadingAnimation from "../../../Components/Loading/Loading.tsx";


const UserInformationScreen = () => {

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMockBackendUserData();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //@ts-ignore
  const renderItem = ({ item }) => (
    <UserInformationCard user={item} />
  );

  if (loading) {
    return (
      <LoadingAnimation/>
    );
  }

  return (
    <FlatList
      numColumns={3}
      data={userData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );

};



export default UserInformationScreen;
