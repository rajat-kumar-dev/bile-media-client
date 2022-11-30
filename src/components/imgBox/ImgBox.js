import { Avatar, IconButton } from '@material-ui/core';

const ImgBox = (props) => {
  const { circle, src, size, ratio } = props;
  return (
    <>
      <div
        style={{
          width: size ?? '50px',
          aspectRatio: ratio ?? '1/1',
          borderRadius: circle ?? '0',
          overflow: 'hidden',
        }}
      >
        <img
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
          src={src ?? 'https://picsum.photos/40/40?random=1'}
          alt=""
          className="img-fluid"
        />
      </div>
    </>
  );
};

export default ImgBox;
