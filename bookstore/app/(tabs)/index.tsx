import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface BookInterface {
  id: string;
  title: string;
  description: string;
  bookname: string;
  bookAuthor: string;
  bookPublishDate: string;
  downloadable: "YES" | "NO";
}

export default function TabOneScreen() {
  const [books, setBooks] = useState<BookInterface[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/books");
        const data = await res.json();
        setBooks(data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          📚 Popular Book
        </Text>
        {books.length > 0 &&
          books.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={{
                backgroundColor: "#f9f9f9",
                padding: 16,
                marginBottom: 24,
                borderRadius: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 3,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=3596&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                  style={{
                    width: 80,
                    height: 100,
                    borderRadius: 8,
                    marginRight: 12,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 4,
                    }}
                  >
                    {book.title}
                  </Text>
                  <Text
                    style={{ fontSize: 14, color: "#666", marginBottom: 6 }}
                  >
                    By {book.bookAuthor}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#333" }}>
                    {book.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
