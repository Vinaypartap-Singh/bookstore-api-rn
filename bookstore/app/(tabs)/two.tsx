import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TabTwoScreen() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [downloadable, setDownloadable] = useState(true); // Now a boolean

  const handleSubmit = async () => {
    if (!title || !author || !description || !publishDate) {
      Alert.alert("Please fill out all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          bookauthor: author,
          description,
          bookname: title,
          bookPublishDate: new Date(publishDate).toISOString(),
          downloadable: downloadable ? "YES" : "NO",
        }),
      });

      if (response.ok) {
        Alert.alert("Success", "Book added successfully");
        setTitle("");
        setAuthor("");
        setDescription("");
        setPublishDate("");
        setDownloadable(true);
      } else {
        Alert.alert("Error", "Failed to add book");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          backgroundColor: "white",
          flexGrow: 1,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            marginBottom: 20,
            color: "#333",
          }}
        >
          📘 Post a New Book
        </Text>

        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={inputStyle}
        />

        <TextInput
          placeholder="Author"
          value={author}
          onChangeText={setAuthor}
          style={inputStyle}
        />

        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={{
            ...inputStyle,
            textAlignVertical: "top",
          }}
        />

        <TextInput
          placeholder="Publish Date (YYYY-MM-DD)"
          value={publishDate}
          onChangeText={setPublishDate}
          style={inputStyle}
        />

        {/* Checkbox for Downloadable */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 16, marginBottom: 6 }}>Downloadable:</Text>
          <TouchableOpacity
            onPress={() => setDownloadable(!downloadable)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#ccc",
            }}
          >
            <View
              style={{
                height: 20,
                width: 20,
                marginRight: 10,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#333",
                backgroundColor: downloadable ? "#333" : "#fff",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {downloadable && (
                <Text style={{ color: "white", fontWeight: "bold" }}>✓</Text>
              )}
            </View>
            <Text>{downloadable ? "Yes" : "No"}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ padding: 20, backgroundColor: "black", borderRadius: 10 }}
          onPress={handleSubmit}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
          >
            Publish Book
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const inputStyle = {
  backgroundColor: "#fff",
  padding: 12,
  borderRadius: 10,
  marginBottom: 12,
  borderColor: "#ccc",
  borderWidth: 1,
  fontSize: 16,
};
