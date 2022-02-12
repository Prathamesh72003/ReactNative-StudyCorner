import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

// const pdf = [
//   {
//     name: 'one',
//     sub: 1,
//     unit: 3,
//     owner: 'pthakare@gmail.com',
//     img: 'https://picsum.photos/700',
//     pdf: 'https://www.ets.org/Media/Tests/GRE/pdf/gre_research_validity_data.pdf',
//   },
//   {
//     name: 'two',
//     sub: 2,
//     unit: 2,
//     owner: 'pthakare@gmail.com',
//     img: 'https://picsum.photos/700',
//     pdf: 'https://www.ets.org/Media/Tests/GRE/pdf/gre_research_validity_data.pdf',
//   },
//   {
//     name: 'three',
//     sub: 1,
//     unit: 3,
//     owner: 'pthakare@gmail.com',
//     img: 'https://picsum.photos/700',
//     pdf: 'https://www.ets.org/Media/Tests/GRE/pdf/gre_research_validity_data.pdf',
//   },
//   {
//     name: 'four',
//     sub: 1,
//     unit: 1,
//     owner: 'pthakare@gmail.com',
//     img: 'https://picsum.photos/700',
//     pdf: 'https://www.ets.org/Media/Tests/GRE/pdf/gre_research_validity_data.pdf',
//   },
//   {
//     name: 'five',
//     sub: 2,
//     unit: 3,
//     owner: 'pthakare@gmail.com',
//     img: 'https://picsum.photos/700',
//     pdf: 'https://www.ets.org/Media/Tests/GRE/pdf/gre_research_validity_data.pdf',
//   },
// ];

const PdfScreen = ({navigation, route}) => {
  const [pdf, setPdf] = useState([]);
  useEffect(() => {
    const getPdf = async () => {
      try {
        const pdfList = [];
        await firestore()
          .collection('pdfs')
          .get()
          .then(result => {
            result.forEach(doc => {
              const {img, name, owner, pdf, sub, unit} = doc.data();
              pdfList.push({
                img,
                name,
                owner,
                pdf,
                sub,
                unit,
              });
            });
          });
        setPdf(pdfList);
      } catch (error) {
        console.log("eee"+error);
      }
    };

    getPdf();

    navigation.setOptions({
      title: route.params.unit,
    });

    console.log(route.params.sub);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {pdf.map((item, index) => {
          if (item.unit == route.params.unit_id)
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                key={index}
                onPress={() =>
                  navigation.navigate('Read', {pdf: item.pdf, name: item.name})
                }>
                <Card style={styles.card}>
                  <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
                  <Card.Content>
                    <Title style={styles.Cardtitle}>{item.name}</Title>
                    <Paragraph style={styles.CardContent}>
                      {item.owner}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            );
        })}
      </ScrollView>
    </View>
  );
};

export default PdfScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    // padding: 20,
  },
  card: {
    backgroundColor: 'lavender',
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    marginBottom: 10,
  },
  Cardtitle: {
    marginTop: 10,
  },
  CardContent: {
    opacity: 0.7,
  },
});
