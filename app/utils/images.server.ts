import type { FacilityImage } from '~/types';

// In production, this could come from a database or CMS
const imageData: FacilityImage[] = [
  {
    id: '1',
    filename: '11층라운지_신축이라_깨끗하고_인테리어가_깔끔하다.jpg',
    title: '11층 라운지',
    description: '신축 건물의 깨끗하고 모던한 인테리어',
    category: 'lounge',
    order: 1
  },
  {
    id: '2',
    filename: '배정받은자리_넓고_쾌적하였다.jpg',
    title: '업무 공간',
    description: '넓고 쾌적한 개인 업무 공간',
    category: 'workspace',
    order: 2
  },
  {
    id: '3',
    filename: '냉장고_얼음정수기_커피머신이_구비되어_있었다.jpg',
    title: '음료 시설',
    description: '냉장고, 얼음정수기, 커피머신 완비',
    category: 'amenity',
    order: 3
  },
  {
    id: '4',
    filename: '싱크대와_제빙기_전자렌지도_있었다.jpg',
    title: '주방 시설',
    description: '싱크대, 제빙기, 전자렌지 구비',
    category: 'amenity',
    order: 4
  },
  {
    id: '5',
    filename: '각층마다_이러한_집기류가_구비되어_있었다.jpg',
    title: '층별 편의시설',
    description: '각 층마다 완비된 사무 집기류',
    category: 'amenity',
    order: 5
  },
  {
    id: '6',
    filename: '지하철_남부터미널역에서_도보로_이동가능하다(10분내외).jpg',
    title: '지하철 접근성',
    description: '남부터미널역에서 도보 10분 이내',
    category: 'access',
    order: 6
  },
  {
    id: '7',
    filename: '6번출구에서_내려서_도보로_이동하면된다.jpg',
    title: '6번 출구',
    description: '지하철 6번 출구에서 도보 이동',
    category: 'access',
    order: 7
  },
  {
    id: '8',
    filename: '주차타워로들어가는입구_승인된사람만_주차가능하다..jpg',
    title: '주차 시설',
    description: '승인된 회원만 이용 가능한 주차타워',
    category: 'access',
    order: 8
  },
  {
    id: '9',
    filename: '장애인_주차공간이_있었다.jpg',
    title: '장애인 주차',
    description: '장애인 전용 주차공간 완비',
    category: 'access',
    order: 9
  }
];

export async function getImageData(): Promise<FacilityImage[]> {
  // Sort by order
  return imageData.sort((a, b) => a.order - b.order);
}

export async function getImagesByCategory(category: string): Promise<FacilityImage[]> {
  return imageData.filter(img => img.category === category);
}