import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const style = {
  //container用のスタイルを定義
  container: css`
    background-color: red;
  `,
  // box用のスタイルを定義
  box: css`
    background-color: blue;
  `,
};

const Mui = () => {
  return (
    <Container component="main" maxWidth="xs" css={style.container}>
      <Box
        component="form"
        noValidate
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        css={style.box}
      >
        <TextField label="キーワードを入力してください" variant="standard" margin="normal" fullWidth />
        <Button variant="contained" margin="normal" fullWidth>
          検索
        </Button>
      </Box>
    </Container>
  );
};

export default Mui;
