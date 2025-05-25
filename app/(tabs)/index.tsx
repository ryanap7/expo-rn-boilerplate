import ThemedButton from "@/components/ThemedButton";
import ThemedContainer from "@/components/ThemedContainer";
import ThemedGap from "@/components/ThemedGap";
import ThemedInput from "@/components/ThemedInput";
import ThemedSelect from "@/components/ThemedSelect";
import ThemedTextarea from "@/components/ThemedTextarea";
import { IcPassword, IcUserID } from "@assets/icons";
import React, { useState } from "react";
import { Alert } from "react-native";

const DATA = [
  {
    key: "bandung",
    value: "Bandung",
  },
  {
    key: "majalengka",
    value: "Majalengka",
  },
];

const HomeScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");
  const [errorName, setErrorName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      setErrorName("Nama tidak boleh kosong.");
      return;
    }

    setErrorName("");

    Alert.alert(
      "Sukses",
      `Data berhasil dikirim:\n\nNama: ${name}\nSandi: ${password}\nCatatan: ${note}`
    );
  };

  return (
    <ThemedContainer style={{ paddingHorizontal: 16 }}>
      <ThemedSelect label="Kota" data={DATA} icon={<IcUserID />} />
      <ThemedGap height="md" />
      <ThemedInput
        icon={<IcUserID />}
        label="Employee ID"
        placeholder="Enter Employee ID"
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (errorName) setErrorName("");
        }}
        error={errorName}
      />
      <ThemedGap height="md" />
      <ThemedInput
        icon={<IcPassword />}
        label="Password"
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <ThemedGap height="md" />
      <ThemedTextarea
        label="Catatan Tambahan"
        placeholder="Tulis sesuatu di sini..."
        value={note}
        onChangeText={setNote}
      />
      <ThemedGap height="md" />
      <ThemedButton
        variant="primary"
        title="Submit"
        loading={false}
        onPress={handleSubmit}
      />
    </ThemedContainer>
  );
};

export default HomeScreen;
