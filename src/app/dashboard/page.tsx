import { getServerToken, userServerUser } from '@/hooks/useServerToken'
import useAxios from '@/hooks/useAxios';
import RoleRedirect from '@/layout/components/role-redirect';
import { USER } from '@/utils/types';

interface PageProps {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params }: PageProps) => {
  const user: USER = await userServerUser();
  const token = await getServerToken();
  const request = useAxios();

  try {
    const response = await request({
      method: 'get',
      url: `/api/products/${params.productId}`,
      token // Pass token in config
    });

    return (
      <RoleRedirect user={user} token={token}>
        {/* Your product page content here */}
        <div>Product Details</div>
      </RoleRedirect>
    );
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return (
      <RoleRedirect user={user} token={token}>
        <div>Error loading product</div>
      </RoleRedirect>
    );
  }
}

export default ProductPage;