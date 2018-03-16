package gtw.galileo.booking.repository.search;

import gtw.galileo.booking.domain.Agency;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Agency entity.
 */
public interface AgencySearchRepository extends ElasticsearchRepository<Agency, Long> {
}
