import React, {PropsWithChildren, useState} from 'react';
import {Asset} from 'react-native-image-picker';

interface HelperFormContextState {
  initState: () => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  profileImageFile?: Asset;
  setProfileImageFile?: (file: Asset) => void;
  realName: string;
  setRealName: (realName: string) => void;
  birthDate: string;
  setBirthDate: (birthDate: string) => void;
  identityImageFile?: Asset;
  setIdentityImageFile?: (file: Asset) => void;
  identityBackImage?: Asset;
  setIdentityBackImage?: (file: Asset) => void;
  identityFaceImage?: Asset;
  setIdentityFaceImage?: (file: Asset) => void;
  phone: string;
  setPhone: (phone: string) => void;
  facebookProfile: string;
  setFacebookProfile: (facebookProfile: string) => void;
  isVisibleGoSetting: boolean;
  setIsVisibleGoSetting: (isVisible: boolean) => void;
}

export const HelperFormContext = React.createContext<HelperFormContextState>({
  initState: () => {},
  isLoading: false,
  setLoading: () => {},
  profileImageFile: {},
  setProfileImageFile: () => {},
  realName: '',
  setRealName: () => {},
  birthDate: '',
  setBirthDate: () => {},
  identityImageFile: {},
  setIdentityImageFile: () => {},
  identityBackImage: {},
  setIdentityBackImage: () => {},
  identityFaceImage: {},
  setIdentityFaceImage: () => {},
  phone: '',
  setPhone: () => {},
  facebookProfile: '',
  setFacebookProfile: () => {},
  isVisibleGoSetting: false,
  setIsVisibleGoSetting: () => {},
});

const HelperFormProvider = ({children}: PropsWithChildren) => {
  const [isLoading, setLoading] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<Asset>({});
  const [realName, setRealName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [identityImageFile, setIdentityImageFile] = useState<Asset>({});
  const [identityFaceImage, setIdentityFaceImage] = useState<Asset>({});
  const [identityBackImage, setIdentityBackImage] = useState<Asset>({}); // 신분증 뒷면
  const [phone, setPhone] = useState('');
  const [facebookProfile, setFacebookProfile] = useState('');
  const [isVisibleGoSetting, setIsVisibleGoSetting] = useState(false);
  const initState = () => {
    setProfileImageFile({});
    setRealName('');
    setBirthDate('');
    setIdentityImageFile({});
    setIdentityBackImage({});
    setIdentityFaceImage({});
    setPhone('');
    setFacebookProfile('');
  };

  return (
    <HelperFormContext.Provider
      value={{
        initState,
        isLoading,
        setLoading,
        profileImageFile,
        setProfileImageFile,
        realName,
        setRealName,
        birthDate,
        setBirthDate,
        identityImageFile,
        setIdentityImageFile,
        identityBackImage,
        setIdentityBackImage,
        identityFaceImage,
        setIdentityFaceImage,
        phone,
        setPhone,
        facebookProfile,
        setFacebookProfile,
        isVisibleGoSetting,
        setIsVisibleGoSetting,
      }}>
      {children}
    </HelperFormContext.Provider>
  );
};

export default HelperFormProvider;
