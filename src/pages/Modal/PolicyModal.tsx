import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ModalStackParam} from '../../types/navigation';
import FooterButton from '../../components/@shared/Button/FooterButton';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<ModalStackParam, 'PolicyModal'>;

const PolicyModal = ({route}: Props) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {policy} = route.params;

  if (policy === 'privacy') {
    return (
      <>
        <ScrollView>
          <View style={{padding: 20, paddingBottom: 150}}>
            <Text style={{fontSize: 12, color: '#171717'}}>
              [EN] Privacy Policy This privacy policy describes how Handsfree
              collects, uses, and shares your personal information when you use
              our app. {'\n\n'}1. What Personal Information We Collect We
              collect the following personal information from you: • Contact
              information, such as your name, email address, and phone number. •
              Device information, such as your device type and operating system.
              • Location information, such as your IP address and GPS
              coordinates. • Usage information, such as the pages you visit and
              the services you use on our app. • Payment information, if you
              make purchases through our app. 2. How We Use Your Personal
              Information We use your personal information for the following
              purposes: • To provide you with the services you request, such as
              running errands for you. • To improve our app and services. • To
              send you marketing messages about our products and services. • To
              protect our rights and property. 3. Sharing Your Personal
              Information We may share your personal information with the
              following third parties: • Service providers who help us operate
              our app, such as payment processors and cloud storage providers. •
              Advertisers who may show you ads on our app. • Law enforcement
              agencies if we are required to do so by law. 4. Your Choices You
              can choose to share or not share your personal information with
              us. However, if you do not share certain information, we may not
              be able to provide you with the services you request. You can also
              opt out of receiving marketing messages from us by following the
              instructions in the message. 5. Your Rights You have the right to
              access, correct, delete, and restrict the processing of your
              personal information. You also have the right to port your data
              and to object to the processing of your personal information. To
              exercise these rights, please contact us at contact@handsfree.com
              6. Children Our app is not intended for use by children under the
              age of 13. If you are under the age of 13, please do not use our
              app. 7. Changes to This Privacy Policy We may update this privacy
              policy from time to time. The most recent version of the privacy
              policy will always be posted on our website. 8. Contact Us If you
              have any questions about this privacy policy, please contact us at
              contact@handsfree.com{'\n\n'}[KR] 개인정보처리방침 이
              개인정보처리방침은 Handsfree가 앱을 사용할 때 귀하의 개인정보를
              수집, 사용, 공유하는 방법을 설명합니다.{'\n\n'}1. 수집하는
              개인정보 우리는 다음과 같은 개인정보를 수집합니다. • 연락처 정보:
              이름, 이메일 주소, 전화번호 등 • 기기 정보: 기기 유형, 운영 체제
              등 • 위치 정보: IP 주소, GPS 좌표 등 • 사용 정보: 앱에서 방문한
              페이지 및 사용하는 서비스 등 • 결제 정보: 앱을 통해 구매하는 경우
              2. 개인정보의 사용 우리는 귀하의 개인정보를 다음과 같은 목적으로
              사용합니다. • 귀하가 요청한 서비스 제공, 예: 심부름 대행 • 앱과
              서비스 개선 • 제품 및 서비스에 대한 마케팅 메시지 전송 • 권리 및
              재산 보호 3. 개인정보의 공유 우리는 다음과 같은 제3자와 귀하의
              개인정보를 공유할 수 있습니다. • 앱을 운영하는 데 도움을 주는
              서비스 제공자, 예: 결제 처리업체, 클라우드 스토리지제공업체 • 앱에
              광고를 표시할 수 있는 광고주 • 법률에 따라 요구되는 경우 법 집행
              기관 4. 귀하의 선택 귀하는 귀하의 개인정보를 우리에게 공유하거나
              공유하지 않을 수 있습니다. 그러나 특정 정보를 공유하지 않으면
              요청한 서비스를 제공할 수 없을 수 있습니다. 또한 메시지 내의
              지침을 따라 마케팅 메시지 수신을 거부할 수 있습니다. 5. 귀하의
              권리 귀하는 귀하의 개인정보에 대한 접근, 수정, 삭제, 처리 제한,
              데이터 포팅, 개인정보 처리에 대한 이의 제기의 권리를 갖습니다.
              이러한 권리를 행사하려면 contact@handsfree.com으로 문의하십시오.
              6. 어린이 이 앱은 13세 미만의 어린이에게 사용하도록 의도되지
              않았습니다. 만 13세 미만이라면이 앱을 사용하지 마십시오. 7.
              개인정보처리방침 변경 우리는 이 개인정보처리방침을 수시로
              업데이트할 수 있습니다. 최신 버전의 개인정보처리방침은 언제나 당사
              웹사이트에 게시됩니다. 8. 연락처 이 개인정보처리방침에 대한 질문이
              있으면 contact@handsfree.com으로 문의하십시오.{'\n\n'}[VI] Chính
              sách bảo mật Chính sách bảo mật này mô tả cách Handsfree thu thập,
              sử dụng và chia sẻ thông tin cá nhân của bạn khi bạn sử dụng ứng
              dụng của chúng tôi.{'\n\n'}1. Thông tin cá nhân chúng tôi thu thập
              Chúng tôi thu thập các thông tin cá nhân sau đây từ bạn: • Thông
              tin liên hệ, chẳng hạn như tên, địa chỉ email và số điện thoại của
              bạn. • Thông tin thiết bị, chẳng hạn như loại thiết bị và hệ điều
              hành của bạn. • Thông tin vị trí, chẳng hạn như địa chỉ IP và tọa
              độ GPS của bạn. • Thông tin sử dụng, chẳng hạn như các trang bạn
              truy cập và các dịch vụ bạn sử dụng trên ứng dụng của chúng tôi. •
              Thông tin thanh toán, nếu bạn mua hàng thông qua ứng dụng của
              chúng tôi. 2. Cách chúng tôi sử dụng thông tin cá nhân của bạn
              Chúng tôi sử dụng thông tin cá nhân của bạn cho các mục đích sau:
              • Cung cấp cho bạn các dịch vụ bạn yêu cầu, chẳng hạn như chạy
              việc vặt cho bạn. • Cải thiện ứng dụng và dịch vụ của chúng tôi. •
              Gửi cho bạn các tin nhắn tiếp thị về sản phẩm và dịch vụ của chúng
              tôi. • Bảo vệ quyền và tài sản của chúng tôi. 3. Chia sẻ thông tin
              cá nhân của bạn Chúng tôi có thể chia sẻ thông tin cá nhân của bạn
              với các bên thứ ba sau đây: • Các nhà cung cấp dịch vụ giúp chúng
              tôi vận hành ứng dụng của chúng tôi, chẳng hạn như nhà cung cấp xử
              lý thanh toán và nhà cung cấp lưu trữ đám mây. • Các nhà quảng cáo
              có thể hiển thị cho bạn quảng cáo trên ứng dụng của chúng tôi. •
              Cơ quan thực thi pháp luật nếu chúng tôi được yêu cầu làm như vậy
              theo pháp luật. 4. Lựa chọn của bạn Bạn có thể chọn chia sẻ hoặc
              không chia sẻ thông tin cá nhân của mình với chúng tôi. Tuy nhiên,
              nếu bạn không chia sẻ một số thông tin nhất định, chúng tôi có thể
              không thể cung cấp cho bạn các dịch vụ bạn yêu cầu. Bạn cũng có
              thể từ chối nhận tin nhắn tiếp thị từ chúng tôi bằng cách làm theo
              hướng dẫn trong tin nhắn. 5. Quyền của bạn Bạn có quyền truy cập,
              chỉnh sửa, xóa và hạn chế việc xử lý thông tin cá nhân của mình.
              Bạn cũng có quyền di chuyển dữ liệu của mình và phản đối việc xử
              lý thông tin cá nhân của mình. Để thực hiện các quyền này, vui
              lòng liên hệ với chúng tôi qua email: contact@handsfree.com 6. Trẻ
              em Ứng dụng này không nhằm mục đích sử dụng cho trẻ em dưới 13
              tuổi. Nếu bạn dưới 13 tuổi, vui lòng không sử dụng ứng dụng này.
              7. Thay đổi chính sách bảo mật này Chúng tôi có thể cập nhật chính
              sách bảo mật này theo thời gian. Phiên bản mới nhất của chính sách
              bảo mật sẽ luôn được đăng trên trang web của chúng tôi. 8. Liên hệ
              với chúng tôi Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật
              này, vui lòng liên hệ với chúng tôi qua email:
              contact@handsfree.com I hope this is helpful!
            </Text>
          </View>
        </ScrollView>
        <FooterButton
          title={t('check')}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </>
    );
  }
  if (policy === 'certification') {
    return (
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <Text style={{color: '#171717'}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: '#171717'}}>
            핸즈프리 안전 인증 절차
          </Text>
          {'\n\n\n'}핸즈프리는 신분증과 얼굴을 대조하는 인증절차 헬퍼의 페이스북
          프로필 확인을 통한 확실한 신분 인증 마지막으로 1:1 인터뷰를 통한
          검증까지 총 3단계의 인증을 거쳐 확실하게 신원을 검증받은 헬퍼만을
          회원님들과 매칭합니다. {'\n\n'}
          Handsfree is an authentication procedure that matches ID cards and
          faces Verifying a helper's Facebook profile to verify his or her
          identity Lastly, through 1:1 interviews and verification, a total of
          three levels of certification were completed Only the definitely
          identified helper will be matched with the members.{'\n\n'} Handsfree
          là một thủ tục xác thực phù hợp với thẻ căn cước và khuôn mặt Xác minh
          hồ sơ Facebook của người giúp việc để xác minh danh tính của họ Cuối
          cùng, thông qua các cuộc phỏng vấn 1:1 và xác minh, tổng cộng ba cấp
          chứng chỉ đã được hoàn thành Chỉ có người giúp việc được xác định rõ
          ràng là phù hợp với các thành viên.
        </Text>
      </View>
    );
  }

  if (policy === 'facebook') {
    return (
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <Text style={{color: '#171717'}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: '#171717'}}>
            페이스북 프로필 확인 방법{'\n\n\n'}
          </Text>
          1. 모바일 웹 브라우저에서 페이스북에 로그인 합니다.{'\n'}
          2. 우측 상단 ☰ 버튼을 클릭합니다.{'\n'}
          3. 내 프로필보기를 누릅니다.{'\n'}
          4. ··· 버튼을 누릅니다.{'\n'}
          5. 프로필 링크 복사를 누릅니다.{'\n'}
          6. 앱으로 돌아와 복사한 링크를 입력합니다.{'\n\n\n'}
          1. Log in to Facebook from your mobile web browser.{'\n'}
          2. Click the top right ☰ button.{'\n'}
          3. Click View My Profile.{'\n'}
          4. Press the ··· button.{'\n'}
          5. Click Copy Profile Link.{'\n'}
          6. Return to the app and type the link you copied.{'\n\n\n'}
          1. Đăng nhập vào Facebook từ trình duyệt web di động của bạn.{'\n'}
          2. Nhấp vào nút trên cùng bên phải ☰.{'\n'}
          3. Nhấp vào Xem Hồ sơ của tôi.{'\n'}
          4. Nhấn nút ···{'\n'}
          5. Nhấp vào Sao chép Liên kết Hồ sơ.{'\n'}
          6. Quay lại ứng dụng và nhập liên kết bạn đã sao chép.{'\n'}
        </Text>
      </View>
    );
  }
  return (
    <View>
      <Text style={{color: '#171717'}}>{policy}</Text>
    </View>
  );
};

export default PolicyModal;
