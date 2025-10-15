import React, { useState } from 'react';

// Dữ liệu accounts mẫu
const accounts = [
  {
    id: 1,
    username: 'john_doe',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    username: 'jane_smith',
    password: 'mypassword',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    username: 'admin_user',
    password: 'admin123',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    username: 'minh_huy',
    password: 'huy2003',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 5,
    username: 'test_account',
    password: 'testpass',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 6,
    username: 'developer_123',
    password: 'devpass',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  }
];

function SearchAccount() {
  const [searchTerm, setSearchTerm] = useState('');

  // Tính toán danh sách accounts được lọc dựa trên username
  const filteredAccounts = accounts.filter(account =>
    account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      maxWidth: 800,
      margin: '40px auto',
      padding: '24px',
      background: '#f5f5f5',
      borderRadius: '12px'
    }}>
      <h2 style={{
        textAlign: 'center',
        color: '#333',
        marginBottom: 30,
        fontSize: '28px'
      }}>
        Tìm kiếm Account theo Username
      </h2>
      
      {/* Input tìm kiếm */}
      <div style={{ marginBottom: 30 }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Nhập username để tìm kiếm..."
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
      </div>

      {/* Hiển thị kết quả */}
      {filteredAccounts.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {filteredAccounts.map(account => (
            <div
              key={account.id}
              style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e0e0e0',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
              }}
            >
              {/* Avatar */}
              <div style={{ textAlign: 'center', marginBottom: 15 }}>
                <img
                  src={account.avatar}
                  alt={`${account.username} avatar`}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: '3px solid #007bff',
                    objectFit: 'cover'
                  }}
                />
              </div>
              
              {/* Thông tin account */}
              <div style={{ textAlign: 'center' }}>
                <h3 style={{
                  margin: '0 0 10px 0',
                  color: '#333',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  @{account.username}
                </h3>
                
                <div style={{
                  background: '#f8f9fa',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  marginBottom: 8
                }}>
                  <strong style={{ color: '#666' }}>ID:</strong> 
                  <span style={{ marginLeft: 8, color: '#007bff' }}>{account.id}</span>
                </div>
                
                <div style={{
                  background: '#f8f9fa',
                  padding: '8px 12px',
                  borderRadius: '6px'
                }}>
                  <strong style={{ color: '#666' }}>Password:</strong> 
                  <span style={{ 
                    marginLeft: 8, 
                    fontFamily: 'monospace',
                    background: '#e9ecef',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}>
                    {account.password}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          background: '#fff',
          borderRadius: '8px',
          border: '2px dashed #ddd'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: 16,
            color: '#ccc'
          }}>
            🔍
          </div>
          <h3 style={{
            color: '#666',
            fontSize: '18px',
            margin: '0 0 8px 0'
          }}>
            Không tìm thấy kết quả
          </h3>
          <p style={{
            color: '#999',
            margin: 0,
            fontSize: '14px'
          }}>
            Không có account nào có username chứa "{searchTerm}"
          </p>
        </div>
      )}
      
      {/* Hiển thị tổng số kết quả */}
      <div style={{
        marginTop: 20,
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        {searchTerm ? (
          `Tìm thấy ${filteredAccounts.length} account(s) với từ khóa "${searchTerm}"`
        ) : (
          `Hiển thị tất cả ${accounts.length} accounts`
        )}
      </div>
    </div>
  );
}

export default SearchAccount;