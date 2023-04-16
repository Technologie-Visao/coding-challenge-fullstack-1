import { StyleSheet, Text, View} from "react-native";
import {TextureCardProps} from "../../types/textures/card/TextureCardProps";
import {Canvas} from "@react-three/fiber";
import Sphere3D from "../textures/3DSphere";

const TextureCard = ({suggestion}: TextureCardProps) => {

  return (
    <View style={styles.card}>
      <View style={styles.cardThumbnail}>
        <Canvas style={styles.cardThumbnail}>
            <Sphere3D textureUrl={suggestion.thumbnail_url} />
        </Canvas>
      </View>
      <Text style={styles.cardName}>{suggestion.name}</Text>
      <Text style={styles.cardDescription}>{suggestion.description}</Text>
    </View>
  );
}

export default TextureCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
});
