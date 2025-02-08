#HỆ THỐNG THƯƠNG MẠI ĐIỆN TỬ - WEBSITE CHO THUÊ PHIM

# 1. Thành viên

22022547 - Nguyễn Phú Lộc

22022605 - Nguyễn Duy Minh Lâm

22022552 - Trần Đức Đăng Khôi

22022551 - Bùi Ngọc Khánh

# 2. Giới thiệu dự án

Phần mềm được phát triển là một website cho thuê phim trực tuyến, cung cấp cho người dùng nền tảng xem phim với giao diện thân thiện, dễ thao tác, cùng với các tính năng thiết yếu như đăng ký, đăng nhập, xem thông tin phim, thêm phim vào danh sách yêu thích, v.v.

Đặc biệt, hệ thống được tích hợp Recommendation System (hệ thống đề xuất phim) sử dụng trí tuệ nhân tạo (AI) để tối ưu trải nghiệm người dùng.

# 3. Mô tả hệ thống

## Chức năng chính:

**Đăng ký, đăng nhập, quản lý tài khoản người dùng**

**Tìm kiếm phim theo thể loại, tên phim**

**Xem thông tin chi tiết về phim**

**Thêm phim vào danh sách yêu thích**

**Hệ thống gợi ý phim thông minh dựa trên sở thích người dùng**

**Hệ thống gợi ý phim (Recommendation System)**

## Hệ thống đề xuất phim được xây dựng dựa trên hai kỹ thuật chính:

### 1. Lọc dựa trên nội dung (Content-based Filtering)

Mô hình sử dụng phương pháp TF-IDF (Term Frequency-Inverse Document Frequency) để mã hóa nội dung phim thành ma trận số học.

Sau đó, ma trận độ tương đồng Cosine được tính toán để xác định mức độ giống nhau giữa các bộ phim.

Dựa trên kết quả tính toán, hệ thống chọn ra 10 phim có độ tương đồng cao nhất để đề xuất cho người dùng.

### 2. Lọc cộng tác (Collaborative Filtering)

Sử dụng thuật toán Matrix Factorization, cụ thể là Embedding Recommendation System, để học thói quen người dùng:

**Matrix Factorization**: Phân rã ma trận xếp hạng phim thành hai ma trận tiềm ẩn (latent matrices) đại diện cho người dùng và phim.

**Embedding**: Các vector embedding này giúp dự đoán mức độ yêu thích của người dùng đối với một bộ phim.

**Prediction**: Tích vô hướng giữa embedding người dùng và phim cộng với bias được sử dụng để đưa ra dự đoán.

**Optimization**: Sử dụng hàm mất mát Binary Crossentropy để tối ưu mô hình, giúp dự đoán chính xác hơn.

# 4. Cài đặt và chạy dự án

## 4.1. Clone Repository
```bash
$ git clone https://github.com/phulocnguyen/FilmWebsite.git
```
## 4.2. Cài đặt Backend
```bash
$ cd back
$ npm install
$ npm start
```
## 4.3. Cài đặt Frontend
```bash
$ cd front
$ npm install
$ npm start
```
## 4.4. Yêu cầu hệ thống

Node.js phải được cài đặt trên máy tính của bạn.

Sử dụng trình duyệt hiện đại như Google Chrome hoặc Firefox để đảm bảo trải nghiệm tốt nhất.
