import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native-paper';

// Book data structure with cover images and PDF URLs
const books = [
  {
    id: 1,
    title: 'Data Interpretation',
    coverImage: require('../../../assets/Data Interpretation.jpeg'),
    pdfUrl: 'https://drive.google.com/file/d/1-ctXX-skmpcMV58eO98FLSyLW6BtrCMq/view?usp=sharing '
  },
  {
    id: 2,
    title: 'Internal Medicine',
    coverImage: require('../../../assets/Internal Medicine.jpeg'),
    pdfUrl: 'https://drive.google.com/file/d/1hDDL1jbiY19ffTAe0BTsZ_guADnBuMTi/view?usp=sharing ' // Replace with actual URL
  },
  {
    id: 3,
    title: 'The Gale',
    coverImage: require('../../../assets/The Gale.jpeg'),
    pdfUrl: 'https://drive.google.com/file/d/15x18FeZSz8fg9eVSIQMYQOoRuWk9C26o/view?usp=sharing' // Replace with actual URL
  },
  {
    id: 4,
    title: 'TextBook of Human Anatomy',
    coverImage: require('../../../assets/TextBook of Human Anatomy.jpeg'),
    pdfUrl: 'https://drive.google.com/file/d/1yAC26ESWqWhfRgSiiHqLVmtkXfGbp8Oc/view?usp=sharing' // Replace with actual URL
  },
  {
    id: 5,
    title: 'A-Z Family Medical',
    coverImage: require('../../../assets/a-z family medical.jpeg'),
    pdfUrl: 'https://drive.google.com/file/d/13wci7YvPjVWwt33X2rzYrWgt4DzdEce2/view?usp=sharing' // Replace with actual URL
  }
];

const PDFViewer = ({ url, onClose }: { url: string; onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <WebView
          source={{ uri: url }}
          style={styles.webview}
          onLoadEnd={() => setIsLoading(false)}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          allowsFullscreenVideo={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
        />
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    </Modal>
  );
};

export const ReferenceScreen = () => {
  const [selectedBook, setSelectedBook] = useState<typeof books[0] | null>(null);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.gridContainer}>
          {books.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={styles.bookContainer}
              onPress={() => setSelectedBook(book)}
            >
              <Image
                source={book.coverImage}
                style={styles.bookCover}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedBook && (
        <PDFViewer
          url={selectedBook.pdfUrl}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  bookContainer: {
    width: Dimensions.get('window').width * 0.45,
    aspectRatio: 0.7,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bookCover: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  webview: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
}); 