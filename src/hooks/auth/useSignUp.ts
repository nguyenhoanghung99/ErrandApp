import {useState} from 'react';
import {Auth, Cache} from 'aws-amplify';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParam} from '../../types/navigation';
import {Alert} from 'react-native';
import uuid from 'react-native-uuid';
import {useTranslation} from 'react-i18next';

const useSignUp = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<AuthStackParam>>();
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('');
  const [isDirectInput, setDirectInput] = useState(true);
  const [confirmCode, setConfirmCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmed, setConfirmed] = useState(false);
  const [signUpComplete, setSignUpComplete] = useState(false);
  const [userIdState, setUserIdState] = useState('');

  const fullEmail = `${email}@${domain}`;

  const disabledSignUp = !fullEmail || !password || !isConfirmed;

  const handleEmail = (value: string) => setEmail(value);

  const handleDomain = (value: string) => setDomain(value);

  const handleDirectInput = (value: boolean) => setDirectInput(value);

  const handleConfirmCode = (value: string) => setConfirmCode(value);

  const handlePassword = (value: string) => setPassword(value);

  const handleConfirmPassword = (value: string) => setConfirmPassword(value);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert(t('error'), t('passwordNotMatch'));
      return;
    }
    const userId = uuid.v4() as string;
    setUserIdState(userId);
    const signupParams = {
      username: `${email}@${domain}`,
      password,
      attributes: {
        email: `${email}@${domain}`,
        name: userId,
      },
    };
    try {
      // TODO : DynamoDB에서 찾아서 있으면, 이미 가입된 유저, 없으면 가입 가능한 유저
      await Auth.signUp(signupParams);
      Alert.alert(t('alert'), t('codeRequest'));
      setSignUpComplete(true);
    } catch (err: any) {
      Cache.clear();
      if (err.code === 'UsernameExistsException') {
        Alert.alert(t('error'), t('alreadyRegistered'));
        return;
      }
      if (err.code === 'InvalidPasswordException') {
        // 비밀번호는 8자 이상이어야 합니다.
        Alert.alert(t('error'), t('passwordLength'));
        return;
      }
      if (err.code === 'InvalidParameterException') {
        // 올바르지 않은 입력이 있습니다.
        Alert.alert(t('error'), t('invalidParameter'));
        return;
      }
      // '회원가입에 실패했습니다.\n문제가 지속되면 관리자에게 문의해주세요.',
      Alert.alert(t('error'), t('failSignUp'));
    }
  };

  const handleSubmitConfirm = async () => {
    try {
      await Auth.confirmSignUp(`${email}@${domain}`, confirmCode);
      // 성공적으로 인증되었습니다.
      Alert.alert(t('alert'), t('successCodeConfirm'));
      setConfirmed(true);
    } catch (err) {
      // 인증번호가 일치하지 않습니다.
      Alert.alert(t('error'), t('codeError'));
    }
  };

  const handleJoin = () => {
    if (password !== confirmPassword) {
      Alert.alert(t('error'), t('passwordNotMatch'));
      return;
    }
    navigation.navigate('EmailSignUpFinal', {
      email: `${email}@${domain}`,
      id: userIdState,
    });
  };

  return {
    email: {
      value: email,
      handleEmail,
      domain,
      handleDomain,
      isDirectInput,
      handleDirectInput,
    },
    confirmCode: {
      value: confirmCode,
      handleConfirmCode,
    },
    password: {
      value: password,
      handlePassword,
      confirmValue: confirmPassword,
      handleConfirmPassword,
    },
    disabledSignUp,
    handleSignUp,
    handleSubmitConfirm,
    handleJoin,
    signUpComplete,
  };
};

export default useSignUp;
