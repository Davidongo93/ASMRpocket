// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Formik, useField } from 'formik';
// import StyledTextInput from '../components/StyledTextInput';
// import StyledText from '../components/StyledText';
// import { loginValidationSchema } from '../validationSchemas/login';

// const initialValues = {
//   email: '',
//   password: '',
// };

// const FormikInputValue = ({ name, ...props }) => {
//   const [field, meta, helpers] = useField(name);

//   return (
//     <>
//       <StyledTextInput
//         error={meta.error}
//         value={field.value}
//         onChangeText={(value) => helpers.setValue(value)}
//         {...props}
//       />
//       {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
//     </>
//   );
// };

// const validate = (values) => {
//   const errors = {};

//   if (!values.email) {
//     errors.email = 'Email is required';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//     errors.email = 'Invalid email address';
//   }

//   console.log(errors);

//   return errors;
// };

// const Login = () => {
//   return (
//     <Formik
//       validationSchema={loginValidationSchema}
//       initialValues={initialValues}
//       onSubmit={(values) => {
//         console.log(values);
//       }}
//     >
//       {({ values, handleChange, handleSubmit }) => {
//         return (
//           <View style={styles.form}>
//             <FormikInputValue placeholder='Email' name='Email' />
//             <FormikInputValue placeholder='Password' name='Password' secureTextEntry />
//             <TouchableOpacity onPress={handleSubmit} style={styles.button}>
//               <Text style={styles.buttonText}>Log In</Text>
//             </TouchableOpacity>
//           </View>
//         );
//       }}
//     </Formik>
//   );
// };

// const styles = StyleSheet.create({
//   form: {
//     margin: 20,
//   },
//   button: {
//     backgroundColor: 'blue',
//     borderRadius: 5,
//     padding: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   error: {
//     color: 'red',
//     fontSize: 12,
//     marginBottom: 20,
//     marginTop: -5,
//     margin: 5,
//   },
// });

// export default Login;
