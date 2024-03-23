import React, {useContext} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParam} from '../../types/navigation';
import {Auth, Cache} from 'aws-amplify';
import {Alert} from 'react-native';
import {UserContext} from '../../contexts/UserContext';
import {useTranslation} from 'react-i18next';

const useLogin = () => {
  const {t} = useTranslation();
  const [email, setEmail] = React.useState('');
  const [domain, setDomain] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isDirectInput, setDirectInput] = React.useState(true);
  const navigation = useNavigation<NavigationProp<AuthStackParam>>();
  const user = useContext(UserContext);

  const goToEmailLogin = () => {
    navigation.navigate('EmailLogin');
  };

  const goToEmailSignUp = () => {
    navigation.navigate('EmailSignUp');
  };

  const handleEmail = (value: string) => setEmail(value);

  const handleDomain = (value: string) => setDomain(value);

  const handleDirectInput = (value: boolean) => setDirectInput(value);

  const handlePassword = (value: string) => setPassword(value);

  const handleEmailLogin = async () => {
    const emailValue = `${email}@${domain}`;
    try {
      const data = (await Auth.signIn(emailValue, password)) as {
        attributes: {name: string};
      };
      console.log('🚀 ~ file: useLogin.ts:38 ~ data ~ data:', data);

      user.getUser(data.attributes.name);
    } catch (error: any) {
      Cache.clear();
      console.log(
        '🚀 ~ file: useLogin.ts:44 ~ handleEmailLogin ~ error:',
        error,
      );
      Alert.alert(t('error'), t('notUser'));
    }
  };

  return {
    emailLogin: {
      email,
      domain,
      password,
      isDirectInput,
      handleEmail,
      handleDomain,
      handlePassword,
      handleDirectInput,
    },
    handleEmailLogin,
    goToEmailLogin,
    goToEmailSignUp,
  };
};

export default useLogin;
