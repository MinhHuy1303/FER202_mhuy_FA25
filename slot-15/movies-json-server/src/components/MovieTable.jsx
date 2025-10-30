// src/components/MovieTable.jsx
import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner, Badge } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
  const state = useMovieState();
  // Lấy confirmDelete từ Context (chứa logic xóa phim)
  const { dispatch, confirmDelete } = useMovieDispatch(); 
  
  const { movies, genres, loading, movieToDelete, showDeleteModal } = state;

  // Tạo genre map từ dữ liệu API
  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  // Hàm để lấy màu badge theo danh mục
  const getCategoryBadgeVariant = (genreName) => {
    const categoryColors = {
      'Sci-Fi': 'primary',
      'Comedy': 'warning',
      'Drama': 'info', 
      'Horror': 'dark',
      'Romance': 'danger',
      'Action': 'success',
      'Thriller': 'secondary'
    };
    return categoryColors[genreName] || 'secondary';
  };

  const handleEditClick = (movie) => {
      // Mở Modal Sửa và gán dữ liệu vào state
      dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };
  
  const handleDeleteClick = (movie) => {
      // Mở Modal Xác nhận Xóa và gán phim vào movieToDelete
      dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  return (
    <>
      {loading && movies.length === 0 ? (
          <div className="text-center my-4">
              <Spinner animation="border" role="status" variant="primary" className="me-2" />
              <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
          </div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>ID</th>
              <th>Tên Phim</th>
              <th>Danh mục</th>
              <th>Thời lượng (phút)</th>
  
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => {
              const genreName = genreMap[movie.genreId] || 'Unknown';
              return (
                <tr key={movie.id}>
                  <td style={{ textAlign: 'center' }}>
  <Image
    src={movie.avatar}
    alt={movie.title}
    style={{
      width: '100px',           // 🔼 tăng kích thước
      height: '140px',          // 🔼 giữ tỉ lệ poster (2:3)
      objectFit: 'cover',       // cắt đều ảnh cho vừa khung
      borderRadius: '8px',      // bo góc ảnh
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)' // đổ bóng nhẹ
    }}
    thumbnail                   // thêm khung mảnh bao quanh
  />
</td>
                  <td>#{movie.id}</td>
                  <td>
                    <strong>{movie.title}</strong>
                    <br />
                    <small className="text-muted">({movie.year})</small>
                  </td>
                  <td>
                    
                      {genreName}
                    
                  </td>
                  <td>{movie.duration} phút</td>
                 
                  <td>
                    <Button variant="primary" size="sm" onClick={() => handleEditClick(movie)} className="me-2">Sửa</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(movie)}>Xóa</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {/* MODAL XÁC NHẬN XÓA */}
      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa phim **"{movieToDelete?.title}"** (ID: {movieToDelete?.id}) không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>
            Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default MovieTable;
