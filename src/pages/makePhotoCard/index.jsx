import { useForm } from 'react-hook-form';

import axios from '@/lib/axios';
import { useRouter } from 'next/router';

import PrimaryButton from '@/components/shared/PrimaryButton';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function MakePhotoCard() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const file = data.image;
    const jsonData = {
      name: data.name,
      description: data.description,
      grade: data.grade,
      genre: data.genre,
      price: data.price,
      quantity: data.quantity,
    };

    // FormData 생성
    const formData = new FormData();
    formData.append('file', file); // 파일 데이터 추가
    formData.append('data', JSON.stringify(jsonData)); // JSON 데이터 추가

    try {
      const response = await axios.post('/api/v1/users/my-cards', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (process.env.NODE_ENV === 'development') {
        console.log('API 응답:', response.data);
      }

      router.push('/makePhotoCard/success');

      reset();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('API 요청 오류:', error);
        console.error('데이터 상태:', formData);
      }
      router.push('makePhotoCard/failed');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      document.getElementById('fileName').value = file.name; // 파일 이름 설정

      const newFileName = `file_${Date.now()}.${file.name.split('.').pop()}`; // 새 파일 이름 생성
      const renamedFile = new File([file], newFileName, { type: file.type });

      setValue('image', renamedFile);
    }
  };

  const FILTER_LIST = [
    {
      label: '등급을 선택해 주세요',
      category: 'grade',
      options: [
        { value: 'COMMON', label: 'COMMON' },
        { value: 'RARE', label: 'RARE' },
        { value: 'SUPER_RARE', label: 'SUPER RARE' },
        { value: 'LEGENDARY', label: 'LEGENDARY' },
      ],
    },
    {
      label: '장르를 선택해 주세요',
      category: 'genre',
      options: [
        { value: 'TRAVEL', label: '여행' },
        { value: 'LANDSCAPE', label: '풍경' },
        { value: 'PORTRAIT', label: '인물' },
        { value: 'OBJECT', label: '사물' },
      ],
    },
  ];

  const inputStyle =
    'border focus-visible:ring-0 focus-visible:ring-transparent bg-black focus-visible:ring-offset-0 w-[345px] h-[55] mb:w-[440px] tb:w-[520px] h-[60px]';
  const labelStyle = 'font-bold text-xl leading-7';
  const divStyle = 'flex flex-col gap-[10px]';
  const drpDownStyle = 'border w-[345px] h-[55] mb:w-[440px] tb:w-[520px] h-[60px] bg-black';

  return (
    <div className="flex flex-col px-20 py-6 lt:px-55 lt:py-7">
      <h1 className="hidden border-b border-white pb-5 font-baskin font-normal mb:flex mb:text-5xl lt:text-6xl">
        포토카드 생성
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-14 flex flex-col items-center gap-14">
        <div className={divStyle}>
          <label className={labelStyle}>포토카드 이름</label>
          <Input
            {...register('name', {
              required: '필수 입력 사항입니다',
              maxLength: {
                value: 30,
                message: '최대 30자까지 입력 가능합니다',
              },
            })}
            className={`${errors.name ? 'border-customRed' : 'border-white'} ${inputStyle}`}
            placeholder="포토카드 이름을 입력해 주세요"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>등급</label>
          <Select key={FILTER_LIST[0].category} onValueChange={(value) => setValue('grade', value)}>
            <SelectTrigger className={drpDownStyle}>
              <SelectValue placeholder={FILTER_LIST[0].label} />
            </SelectTrigger>
            <SelectContent>
              {FILTER_LIST[0].options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>장르</label>
          <Select key={FILTER_LIST[1].category} onValueChange={(value) => setValue('genre', value)}>
            <SelectTrigger className={drpDownStyle}>
              <SelectValue placeholder={FILTER_LIST[1].label} />
            </SelectTrigger>
            <SelectContent>
              {FILTER_LIST[1].options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>가격</label>
          <Input
            {...register('price', { required: '필수 입력 사항입니다' })}
            className={`${inputStyle}`}
            placeholder="가격을 입력해 주세요"
          />
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>총 발행량</label>
          <Input
            {...register('quantity', {
              required: '필수 입력 사항입니다',
              maxLength: {
                value: 30,
                message: '최대 30자까지 입력 가능합니다',
              },
            })}
            className={`${inputStyle}`}
            placeholder="총 발행량을 입력해 주세요"
          />
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>사진 업로드</label>
          <div
            className={`m-0 flex h-[55px] w-[345px] flex-row justify-between p-0 mb:w-[440px] tb:w-[520px]`}
          >
            <Input
              id="fileName"
              type="text"
              readOnly
              placeholder="사진 업로드"
              value={watch('image')?.name || '업로드를 해주세요'}
              className={`h-[55px] w-[310px] border bg-black focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 mb:w-[310px] tb:w-[390px]`}
            />
            <button
              type="button"
              onClick={() => document.getElementById('file-input').click()}
              className="h-[55px] w-[105px] rounded border border-customMain bg-black px-4 py-2 text-base font-normal text-customMain mb:w-[120px]"
            >
              파일 선택
            </button>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>}
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>포토카드 설명</label>
          <textarea
            {...register('description', {
              required: '설명을 입력해주세요.',
              maxLength: {
                value: 500,
                message: '설명은 최대 500자까지 작성 가능합니다.',
              },
            })}
            placeholder="카드 설명을 입력해 주세요"
            className="h-[180px] w-[345px] resize-none rounded border border-white bg-black p-2 outline-none mb:w-[440px] tb:w-[520px]"
          />
        </div>

        <PrimaryButton
          label={'생성하기'}
          className={'h-[60px] w-[345px] mb:w-[440px] tb:w-[520px]'}
          type="submit"
        />
      </form>
    </div>
  );
}