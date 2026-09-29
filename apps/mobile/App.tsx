import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createPublicSupabaseClient, readSupabaseConfig } from '@shoppit/foundation';

const config = readSupabaseConfig(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
export const supabase = config ? createPublicSupabaseClient(config) : null;

export default function App() {
  return <SafeAreaProvider><SafeAreaView style={styles.screen}>
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.label}>SHOPPIT · FOUNDATION</Text>
      <Text style={styles.title}>A foundation for discovery.</Text>
      <Text style={styles.copy}>The consumer app is ready for the next approved build phase.</Text>
      <View style={styles.card}>
        <Text style={styles.heading}>Project configuration</Text>
        <Text style={styles.copy}>{supabase ? 'Supabase client configured. Run the connection check to verify connectivity.' : 'Supabase is not configured. Follow the setup guide to connect your project.'}</Text>
      </View>
    </ScrollView>
  </SafeAreaView></SafeAreaProvider>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f5f5f0' },
  content: { padding: 24, gap: 24, width: '100%', maxWidth: 640, alignSelf: 'center' },
  label: { fontSize: 12, fontWeight: '700', color: '#355648' },
  title: { fontSize: 38, fontWeight: '700', color: '#17291f' },
  copy: { fontSize: 17, lineHeight: 26, color: '#425148' },
  heading: { fontSize: 20, fontWeight: '600', color: '#17291f' },
  card: { padding: 20, gap: 12, borderRadius: 16, backgroundColor: '#ffffff' },
});
