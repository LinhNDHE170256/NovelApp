import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios'; // Thêm axios để gửi yêu cầu HTTP
import AsyncStorage from '@react-native-async-storage/async-storage'; // Thêm AsyncStorage

const Chapter = () => {
    const route = useRoute();
    const { novel, novelId } = route.params; // Lấy tên truyện và novelId từ tham số truyền vào
    const [chapterContent, setChapterContent] = useState('');

    useEffect(() => {
        const fetchChapterContent = () => {
            // Nội dung giả lập, có thể thay bằng API thực tế để lấy nội dung chương từ server
            setChapterContent(`Đấu lực, ba đoạn

Nhìn năm chữ to lớn có chút chói mắt trên trắc nghiệm ma thạch, thiếu niên mặt không chút thay đổi, thần sắc tự giễu, nắm chặt tay, bởi vì dùng lực quá mạnh làm móng tay đâm thật sâu vào trong lòng bàn tay, mang đến từng trận trận đau đớn trong tâm hồn...

Tiêu Viêm, đấu lực, ba đoạn! Cấp bậc: Cấp thấp!.

Bên cạnh trắc nghiệm ma thạch, một vị trung niên nam tử, thoáng nhìn tin tức trên bia, ngữ khí hờ hững công bố…

Trung niên nam tử vừa nói xong, không có gì ngoài ý muốn, đám người trên quảng trường lại nổi lên trận trận châm chọc tao động

Ba đoạn? Hắc hắc, quả nhiên không ngoài dự đoán của ta,Thiên tài này một năm rồi vẫn dậm chân tại chỗ a!

-Ai, phế vật này thật sự làm mất hết cả mặt mũi gia tộc.

-Nếu tộc trưởng không phải phụ thân của hắn. Loại phế vật này sớm đã bị đuổi khỏi gia tộc, tự sinh tự diệt rồi, làm gì còn có cơ hội ở gia tộc ăn không uống không.

-Ai..., thiên tài thiếu niên năm đó của Văn Ô Thản thành, tại sao hôm nay lại lạc phách thành bộ dáng này cơ chứ?

-Ai mà biết được? Có lẽ do làm việc gì đó trái với lương tâm, làm thần linh nổi giận đó mà…

Chung quanh truyền đến cười nhạo cùng thanh âm tiếc hận, dừng ở trong tai của thiếu niên, tựa như một chiếc dao nhọn hung hăng đâm vào tim hắn, khiến hô hấp của thiếu niên trở nên có chút dồn dập.

Thiếu niên chậm rãi ngẩng đầu, lộ ra khuôn mặt thanh tú non nớt, con ngươi đen nhánh nhẹ nhàng đảo qua đám bạn cùng lứa tuổi đang trào phúng chung quanh, khóe miệng thiếu niên tự giễu, tựa hồ trở nên càng thêm chua xót.

-Những người này, đều thừa hơi như vậy sao? Có lẽ vì ba năm trước bọn họ từng trước mặt mình lộ ra bộ mặt tươi cười nhún nhường, cho nên hiện tại muốn đòi trở về đây mà… Mỉm cười chua xót, Tiêu Viêm chán nản xoay người, im lặng đi tới cuối hàng, thân ảnh cô đơn cùng thế giới xung quanh trở nên có chút lạc lõng.

-Người tiếp theo, Tiêu Mị

Nghe người tiến hành trắc nghiệm gọi tên, một thiếu nữ rất nhanh từ trong đám người đi ra, tiếng nghị luận ở xung quanh trở nên nhỏ đi rất nhiều, từng đạo ánh mắt nóng bỏng tập trung lên trên khuôn mặt của thiếu nữ…

Thiếu nữ tuổi không quá mười bốn, dù chưa thể coi là tuyệt sắc, nhưng khuôn mặt non nớt kia cũng ẩn chứa trong đó một tia vũ mị nhàn nhạt, thanh thuần cùng vũ mị, một tập hợp mâu thuẫn, càng khiến nàng trở thành tiêu điểm của toàn trường…

Thiếu nữ nhanh chóng đi lên, tay vuốt ve ma thạch bi quen thuộc, sau đó chậm rãi nhắm mắt…

Tại lúc thiếu nữ nhắm mắt, ma thạch bi đen nhánh lại hiện lên quang mang…

-Đấu khí: Bảy đoạn!

-Tiêu Mị, Đấu khí: Bảy đoạn! Cấp bậc: Cao cấp

-Da! Nghe trắc ngiệm viên đọc lên thành tích, thiếu nữ ngẩng mặt lên đắc ý cười…

-Sách sách, bảy đoạn đấu khí, cứ theo tiến độ như vậy, chỉ sợ không quá ba năm thời gian, nàng có thể trở thành một đấu giả chính thức rồi…

-Không hổ là hạt giống của gia tộc a…

Nghe đám người truyền đến trận trận thanh âm hâm mộ, thiếu nữ tươi cười lại rạng rỡ thêm vài phần, tâm hư vinh, là thứ mà rất nhiều cô gái đều không thể kháng cự…

Nhớ đến ngày thường hay cùng mấy tỷ muội đàm tiếu, tầm mắt Tiêu Mị bỗng nhiên xuyên qua đám người, dừng trên một đạo thân ảnh cô đơn…`);
        };

        fetchChapterContent();

        // Lấy user_id từ AsyncStorage và gửi yêu cầu cập nhật lịch sử
        const addToHistory = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (userId) {
                    await axios.post('http://26.195.183.87:9999/user/add-to-history', {
                        user_id: userId,
                        novel_id: novelId,
                    });
                    console.log('Novel added to history');
                } else {
                    console.log('User not found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error adding to history:', error);
            }
        };

        // Cập nhật lịch sử khi component mount
        addToHistory();

    }, [novelId]);

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.novelTitle}>{novel}</Text>
            </View>
            <View style={styles.header}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.prevButton]}>
                        <Text style={styles.buttonText}> Chương trước</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.nextButton]}>
                        <Text style={styles.buttonText}>Chương sau</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.chapterContainer}>
                <Text style={styles.chapterTitle}>Chương 1</Text>
                <Text style={styles.chapterContent}>{chapterContent}</Text>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cbecb9',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    prevButton: {
        backgroundColor: '#4dc70b',
    },
    nextButton: {
        backgroundColor: '#4dc70b',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    novelTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    chapterContainer: {
        marginTop: 20,
    },
    chapterTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    chapterContent: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
});

export default Chapter;
