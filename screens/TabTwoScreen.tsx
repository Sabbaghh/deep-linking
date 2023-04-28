import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Image } from 'react-native';
import axios from 'axios';

interface dataState {
	data: any;
	loading: boolean;
	error: boolean;
}

export default function TabTwoScreen(props: any) {
	const [dataState, setDataState] = useState<dataState>({
		data: null,
		loading: true,
		error: false,
	});

	const handleData = async () => {

		if (!props?.route?.params?.params?.id) {
			setDataState({ ...dataState, loading: false, error: false });
      return; 
		}
		try {
			const response = await axios.get(
				`https://jsonplaceholder.typicode.com/photos/${props?.route?.params?.params?.id}`,
			);
			setDataState({
				data: response.data,
				loading: false,
				error: false,
			});
		} catch (error) {
			setDataState({
				data: [],
				loading: false,
				error: true,
			});
		}
	};
	useEffect(() => {
		 handleData();
	}, [props?.route?.params?.params?.id]);
	// console.log(props.route.params.params.id)
	if (dataState.loading) return <Text>Loading...</Text>;
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{dataState.data?.title}</Text>
       <View
				style={styles.separator}
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
			/>
      <Image
        style={{width: 200, height: 200}}
        source={{
          uri: dataState.data?.url,
        }}
      />
			{/* <View
				style={styles.separator}
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
			/>
			<EditScreenInfo path='/screens/TabTwoScreen.tsx' /> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
