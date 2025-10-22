import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup
} from 'react-bootstrap';

// Dữ liệu accounts mẫu
const accounts = [
  { id: 1, username: 'john_doe', password: 'password123', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: 2, username: 'jane_smith', password: 'mypassword', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face' },
  { id: 3, username: 'admin_user', password: 'admin123', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { id: 4, username: 'minh_huy', password: 'huy2003', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face' },
  { id: 5, username: 'test_account', password: 'testpass', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { id: 6, username: 'developer_123', password: 'devpass', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' }
];

function SearchAccount() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAccounts = accounts.filter(account =>
    account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm border-0 rounded-4">
        <h2 className="text-center text-primary mb-4 fw-bold">
          🔍 Tìm kiếm Account theo Username
        </h2>

        {/* Input tìm kiếm */}
        <Form className="mb-4">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Nhập username để tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2"
            />
          </InputGroup>
        </Form>

        {/* Kết quả */}
        {filteredAccounts.length > 0 ? (
          <Row className="g-4">
            {filteredAccounts.map((account) => (
              <Col key={account.id} xs={12} sm={6} md={4}>
                <Card
                  className="h-100 text-center border-0 shadow-sm rounded-4"
                  style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <Card.Body>
                    <div className="mb-3">
                      <img
                        src={account.avatar}
                        alt={account.username}
                        className="rounded-circle border border-primary"
                        width="80"
                        height="80"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    <Card.Title className="fw-bold">@{account.username}</Card.Title>
                    <Card.Text className="text-muted">ID: {account.id}</Card.Text>
                    <Card.Text>
                      <strong>Password: </strong>
                      <span className="bg-light px-2 py-1 rounded small">
                        {account.password}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Card className="mt-4 text-center border-0 shadow-sm bg-light py-5 rounded-4">
            <div className="display-6 mb-3 text-secondary">😕</div>
            <h5 className="text-muted">Không tìm thấy kết quả</h5>
            <p className="text-secondary small">
              Không có account nào chứa "{searchTerm}"
            </p>
          </Card>
        )}

        {/* Tổng số kết quả */}
        <div className="text-center text-secondary mt-4 small">
          {searchTerm
            ? `Tìm thấy ${filteredAccounts.length} account(s) với từ khóa "${searchTerm}"`
            : `Hiển thị tất cả ${accounts.length} accounts`}
        </div>
      </Card>
    </Container>
  );
}

export default SearchAccount;
