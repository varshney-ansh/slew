import styles from './search.module.css';
import SearchHead from "@/components/searchHead/SearchHead";
import { permanentRedirect } from 'next/navigation'
import { getResults } from "@/utils/actions";
import WindowOnSearch from '@/components/windowOnSearch/windowOnSearch';
import Footer from '@/components/footer/Footer';

const querySearch = async ({ q, page }) => {

    const res = await getResults({ q, page });
    return res;

}

const TestPage = async props => {
    const searchParams = await props.searchParams;

    const {
        q,
        page,
        type
    } = searchParams;

    if (q == null || q == '' || q == 'undefined') {
        permanentRedirect('/')
    }

    if (q != null) {

        let result;

        if (page == null) {
            result = await querySearch({ q, page: 0 });
        } else {
            result = await querySearch({ q, page });
            if (result?.error) {
                permanentRedirect(`/search?q=${q}&page=${page-1}`);
            }
        }

        return (
            <div className={styles.Main}>
                <SearchHead q={q} type={type} />
                <WindowOnSearch result={result} styles={styles} page={page == null ? 0 : page} q={q} />
                <Footer />
            </div>
        )
    }
}

export default TestPage;