import * as C from './style';

interface IProrps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}
export function Spinner({ top, left, right, bottom }: IProrps ){
  return(
    <C.Container top={top} left={left} right={right} bottom={bottom} />
  );
}