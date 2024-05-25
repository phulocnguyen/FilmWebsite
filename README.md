# Hệ thống thương mại điện tử theo hình thức website cho thuê phim
# Thành viên
1. 22022547 Nguyễn Phú Lộc
2. 22022605 Nguyễn Duy Minh Lâm
3. 22022552 Trần Đức Đăng Khôi
4. 22022551 Bùi Ngọc Khánh

# Giới thiệu dự án

Phần mềm được phát triển là một website cho thuê phim với mục đích cung cấp cho người dùng một nền tảng có thể xem phim trực tuyến. Hệ thống được phát triển với giao diện dễ nhìn, dễ dàng thao tác và với một số chức năng thiết yếu và đơn giản.

## Mô tả

Hệ thống cung cấp một giao diện để người dùng có thể thao tác khá tương tự với các website xem phim khác bao gồm: đăng kí, đăng nhập, xem thông tin phim, thêm vào danh sách yêu thích, ... 

Đặc biệt, hệ thống còn được tích hợp một module AI là Recommendation System (hệ thống đề xuất). Module này hoạt động dựa trên 2 nguyên lí chính bao gồm Content-based filtering (Lọc theo nội dung) và Collaborative filtering (Lọc cộng tác).

Lọc dựa trên nội dung (Content-based filtering)
	• Với các nội dung của phim sẽ được chuyển thành ma trận TF-IDF, các giá trị trong ma trận này là các từ trong nội dung phim.  
	• Sau đó, các giá trị dựa trên ma trận TF-IDF đã được tạo ra trước đó sẽ được dùng để tính toán ma trận độ tương đồng cosin.
	• Sau khi tính toán được các độ tương đồng của các phim dựa trên nội dung, ta sẽ sắp xếp và lấy 10 phim có độ tương đồng lớn nhất để đề xuất cho người dùng.

Lọc cộng tác (Collaborative filtering)
	• Sử dụng thuật toán gợi ý dựa trên embedding (nhúng), cụ thể là Matrix Factorization trong hệ thống gợi ý
	• Các bước chính của thuật toán Matrix Factorization:
		o Matrix Factorization: Thuật toán này phân tích ma trận xếp hạng (rating matrix) thành hai ma trận tiềm ẩn(latent matrices) đại diện cho người dùng và phim. Các ma trận này khi nhân lại với nhau sẽ tái tạo gần đúng ma trận xếp hạng ban đầu.
		o Embedding: Các vector embedding cho người dùng và phim chính là các vector hàng của các ma trận tiềm ẩn này.
		o Dự đoán của mô hình là tích vô hướng giữa embedding người dùng và phim cộng với bias
		o Optimization: Quá trình tối ưu hóa sử dụng hàm mất mát (Binary Crossentropy) để điều chỉnh các vector embedding sao cho dự đoán của mô hình khớp với các xếp hạng thực tế.

## To Install:

Cloning the Repository:

```
$ git clone https://github.com/phulocnguyen/Cancer-Diagnosis-AI-based-System.git

```

Run the app

```
$ cd back
$ npm start
$ cd front
$ npm start

``
Make sure that your local machine installed Node.js



