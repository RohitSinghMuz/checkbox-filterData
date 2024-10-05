import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const App = () => {
  const arrayData = [
    { id: 1, name: "Delhi" },
    { id: 2, name: "Kolkata" },
    { id: 3, name: "Mohali" },
    { id: 4, name: "Hyderabad" },
    { id: 5, name: "Pune" },
    { id: 6, name: "Chennai" },
    { id: 7, name: "Bangalore" },
    { id: 8, name: "Patna" },
  ];

  const imgData = [
    "1",
    "2",
    "Mohali",
    "Hyderabad",
    "Pune",
    "Chennai",
    "Bangalore",
    "Patna",
  ];

  const [sName, setSName] = useState("");
  const [sData, setsData] = useState([]);
  const [currIndex, setcurrIndex] = useState(0);

  const filterData = arrayData.filter((item, index) =>
    item.name.toLowerCase().includes(sName.toLowerCase())
  );

  const handleSelect = (idx) => {
    const selectData = arrayData.find((item, index) => item?.id == idx);

    const isSelected = sData.some((item, index) => item?.id == selectData?.id);
    if (isSelected) {
      const unSelected = sData.filter((item, index) => item.id !== idx);
      setsData(unSelected);
    } else {
      setsData([...sData, selectData]);
    }
  };

  const handleSelectAll = () => {
    setsData([...filterData]);
  };

  const handleUnselectAll = () => {
    setsData([]);
  };

  const imgLength = imgData.length;

  const handleSelectLeft = () => {
    const leftData = (currIndex - 1 + imgLength) % imgLength;
    setcurrIndex(leftData);
  };

  const handleSelectRight = () => {
    const leftData = (currIndex + 1) % imgLength;
    setcurrIndex(leftData);
  };

  useEffect(() => {
    const AutoMove = setInterval(() => {
      const leftData = (currIndex + 1) % imgLength;
      setcurrIndex(leftData);
    }, 3000);

    return () => clearInterval(AutoMove);
  }, [currIndex, imgLength]);

  return (
    <View>
      <TextInput
        placeholder="Enter Name"
        style={{ margin: 2, padding: 10, borderWidth: 1, borderColor: "grey" }}
        onChangeText={(text) => setSName(text)}
      />

      {filterData?.length > 0 ? (
        filterData.map((item, index) => {
          return (
            <View>
              <TouchableOpacity onPress={() => handleSelect(item.id)}>
                <Text
                  style={{
                    padding: 10,
                    backgroundColor: sData.some(
                      (ele, index) => ele?.id === item?.id
                    )
                      ? "red"
                      : "white",
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <Text style={{ padding: 10 }}>name not found</Text>
      )}

      <TouchableOpacity onPress={handleSelectAll}>
        <Text style={{ padding: 10 }}>Select All</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleUnselectAll}>
        <Text style={{ padding: 10 }}>Unselect All</Text>
      </TouchableOpacity>

      <Text style={{ padding: 10 }}>{imgData[currIndex]}</Text>

      <TouchableOpacity onPress={handleSelectLeft}>
        <Text style={{ padding: 10 }}>Left</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSelectRight}>
        <Text style={{ padding: 10 }}>Right</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

// carousel and filter with map and select checkobx
