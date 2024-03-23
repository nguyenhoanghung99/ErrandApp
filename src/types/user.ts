export type CertificateStatus = 'REVIEW' | 'APPROVED' | 'REJECTED';

export type ReviewItem = {
  id: string;
  reviewerId: string;
  reviewerProfileImage: string;
  reviewerName: string;
  date: number;
  result: string;
  content: string;
};
