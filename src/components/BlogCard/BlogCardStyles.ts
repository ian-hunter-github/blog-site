const BlogCardStyles = {
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      padding: '16px',
      backgroundColor: '#F9F9F9', //'#E3F2FD', // Light Blue background
      borderRadius: '8px',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        backgroundColor : "#FFECE5"
      },
    },
    date: {
      fontSize: '0.875rem',
      color: '#555555', // Subtle gray for date text
      marginBottom: '8px',
      fontStyle: 'italic',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#333333', // Darker gray for title
      marginBottom: '8px',
    },
    author: {
      fontSize: '0.875rem',
      color: '#777777', // Subtle gray for author text
      marginBottom: '8px',
    },
    summary: {
      fontSize: '1rem',
      color: '#333333', // Darker gray for summary
    },
  };
  
  export default BlogCardStyles;
  