interface ReviewInput {
  name: string;
  email: string | null;
  rating: number;
  title: string | null;
  comment: string;
}

interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateReviewInput(input: ReviewInput): ValidationResult {
  const errors: Record<string, string> = {};

  // Name validation
  if (!input.name || input.name.trim().length === 0) {
    errors.name = '이름은 필수입니다.';
  } else if (input.name.length > 100) {
    errors.name = '이름은 100자 이내로 입력해주세요.';
  }

  // Email validation (optional but must be valid if provided)
  if (input.email && !isValidEmail(input.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  // Rating validation
  if (!input.rating || input.rating < 1 || input.rating > 5) {
    errors.rating = '평점은 1-5 사이여야 합니다.';
  }

  // Title validation (optional)
  if (input.title && input.title.length > 200) {
    errors.title = '제목은 200자 이내로 입력해주세요.';
  }

  // Comment validation
  if (!input.comment || input.comment.trim().length === 0) {
    errors.comment = '후기 내용은 필수입니다.';
  } else if (input.comment.length > 500) {
    errors.comment = '후기는 500자 이내로 입력해주세요.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}